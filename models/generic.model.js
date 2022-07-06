import db from '../utils/db.js';

export default function (table_name, id_field) {
  return {
    findAll() {
      return db(table_name);
    },

    async findById(id) {
      const list = await db(table_name).where(id_field, id);
      if (list.length === 0) {
        return null;
      }

      return list[0];
    },

    add(entity) {
      return db(table_name).insert(entity);
    },

    del(id) {
      return db(table_name).where(id_field, id).del();
    },

    patch(id, entity) {
      return db(table_name).where(id_field, id).update(entity);
    },
  }
}

