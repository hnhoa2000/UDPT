import express from 'express';
import { readFile } from 'fs/promises';
import validate from '../middlewares/validate.mdw.js';
import auth from '../middlewares/auth.mdw.js';
import employeeModel from '../models/employee.model.js';
import storeModel from '../models/store.model.js';

const schema = JSON.parse(await readFile(new URL('../schemas/employee.json', import.meta.url)));
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const employees = await employeeModel.findAll();
    res.status(201).json(employees);
})

router.post('/', auth, validate(schema), async (req, res) => {
    if (req.payloadToken.role === 'store') {
        const employee = req.body;
        const store = await storeModel.findByAccountId(req.payloadToken.IdTaiKhoan);
        employee.StoreID = store.StoreID;
        const result = await employeeModel.add(employee);
        res.status(201).json({
            message: "add employee successful"
        });
    } else {
        res.status(401).json({
            message: "invalid access"
        })
    }
});

router.delete('/:EmployeeId', auth, async (req, res) => {
    if (req.payloadToken.role === 'store') {
        const result = await employeeModel.del(req.params.EmployeeId);
        if (result === 0) {
            res.status(401).json({
                message: "invalid EmployeeId"
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

router.put('/:EmployeeId', auth, async (req, res) => {
    if (req.payloadToken.role === 'store') {
        const employee = req.body;
        const result = await employeeModel.patch(req.params.EmployeeId, employee);
        if (result === 0) {
            res.status(401).json({
                message: "invalid EmployeeId"
            });
        } else {
            res.status(201).json({
                message: "update employee successful"
            });
        }
    } else {
        res.status(401).json({
            message: "invalid access"
        })
    }
})


export default router;