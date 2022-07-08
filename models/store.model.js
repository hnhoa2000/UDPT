import db from '../utils/db.js';
import generate from './generic.model.js';
let storeModel = generate('Store', 'StoreID');

storeModel.findByAccountId = async function (accountId) {
    const rows = await db('Store').where('AccountID', accountId);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}


export default storeModel;