const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

// Retorna uma Sessão
let section;
async function session() {
  return section
    ? Promise.resolve(section)
    : mysqlx.getSession(config);
}
// Retorna o Schema
let schema;
async function connection() {
  return schema
    ? Promise.resolve(schema)
    : session()
      .then((s) => {
        schema = s.getSchema('Trybeer');
        return schema;
      })
      .catch(() => {
        process.exit(1);
      });
}

module.exports = { connection, session };
