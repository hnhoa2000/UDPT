import express from 'express';
import { readFile } from 'fs/promises';
import bcrypt from 'bcryptjs';
import userModel from '../models/user.model.js';
import validate from '../middlewares/validate.mdw.js';
import auth from '../middlewares/auth.mdw.js';

const schema = JSON.parse(await readFile(new URL('../schemas/user.json', import.meta.url)));
const router = express.Router();

router.post('/', validate(schema), async function (req, res) {
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);
    const ret = await userModel.add(user);

    user = {
        IdTaiKhoan: ret[0],
        ...user
    }

    delete user.password;
    res.status(201).json(user);
});

router.delete('/:idTaiKhoan', async (req, res) => {
    const ret = await userModel.del(req.params.idTaiKhoan);
    if (ret === 0) {
        res.status(401).json({
            message: "idTaiKhoan is not exist"
        });
    } else {
        res.status(201).json({
            message: "delete successful"
        });
    }
});

router.get('/', auth, async (req, res) => {
    if (req.payloadToken.role === 'system') {
        const accounts = await userModel.findAll();
        res.status(201).json(accounts);
    } else {
        res.status(401).json({
            message: "invalid access"
        })
    }
});

router.put('/:AccountId', auth, async (req, res) => {
    if (req.payloadToken.role === 'system') {
        const account = req.body;
        if (account.password) {
            account.password = bcrypt.hashSync(account.password, 10);
        }
        const result = await userModel.patch(req.params.AccountId, account);
        res.status(201).json({
            message: "update account successfull"
        });
    } else {
        res.status(401).json({
            message: "invalid access"
        })
    }
})

export default router;