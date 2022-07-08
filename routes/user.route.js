import express from 'express';
import { readFile } from 'fs/promises';
import bcrypt from 'bcryptjs';
import userModel from '../models/user.model.js';
import validate from '../middlewares/validate.mdw.js';

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
})

export default router;