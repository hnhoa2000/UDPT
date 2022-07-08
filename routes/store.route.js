import express from 'express';
import { readFile } from 'fs/promises';
import validate from '../middlewares/validate.mdw.js';
import auth from '../middlewares/auth.mdw.js';
import storeModel from '../models/store.model.js';

const schema = JSON.parse(await readFile(new URL('../schemas/store.json', import.meta.url)));
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const stores = await storeModel.findAll();
    res.status(201).json(stores);
})

router.post('/', auth, validate(schema), async (req, res) => {
    if (req.payloadToken.role === 'system') {
        const store = req.body;
        const result = await storeModel.add(store);
        res.status(201).json({
            message: "add store successful"
        });
    } else {
        res.status(401).json({
            message: "invalid access"
        })
    }
});

router.delete('/:StoreId', auth, async (req, res) => {
    if (req.payloadToken.role === 'system') {
        const result = await storeModel.del(req.params.StoreId);
        if (result === 0) {
            res.status(401).json({
                message: "invalid StoreId"
            });
        } else {
            res.status(201).json({
                message: "delete store successful"
            });
        }
    } else {
        res.status(401).json({
            message: "invalid access"
        })
    }
});

router.put('/:StoreId', auth, async (req, res) => {
    if (req.payloadToken.role === 'system') {
        const store = req.body;
        const result = await storeModel.patch(req.params.StoreId, store);
        if (result === 0) {
            res.status(401).json({
                message: "invalid StoreId"
            });
        } else {
            res.status(201).json({
                message: "update store successful"
            });
        }
    } else {
        res.status(401).json({
            message: "invalid access"
        })
    }
})


export default router;