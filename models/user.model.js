import db from '../utils/db.js'
import generate from './generic.model.js';
let userModel = generate('TaiKhoan', 'IdTaiKhoan');

userModel.findByUsername = async function (username) {
    const rows = await db('TaiKhoan').where('username', username);
    if (rows.length === 0) {
        return null;
    }

    return rows[0];
}

userModel.isValidRefreshToken = async function (userId, refreshToken) {
    const rows = await db('TaiKhoan').where('IdTaiKhoan', userId).andWhere('rfToken', refreshToken);
    if (rows.length === 0) {
        return false;
    }

    return true;
}

export default userModel;