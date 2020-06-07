import knex from 'knex';
import path from 'path';

const conndb=knex({
    client:'sqlite3',
    connection:{
        filename:path.resolve(__dirname,'database.sqlite')
    },
    pool: {
        afterCreate: (conn: any, cb: any) =>
          conn.run('PRAGMA foreign_keys = ON', cb)
    },
    useNullAsDefault: true
});

export default conndb;