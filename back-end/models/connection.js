const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: 'var/run/mysqld/mysqld.sock',
};

let schema;

const connection = async () => {
  if (schema) return Promise.resolve(schema);

  try {
    const session = await mysqlx.getSession(config);
    schema = await session.getSchema('Trybeer');
    return schema;
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = connection;
