const { MongoClient } = require('mongodb');
require('dotenv').config();

let schema = null;

async function mongoConnection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient.connect(
    process.env.DB_URL || 'mongodb://localhost:27017/trybeerChat',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
    .then((conn) => conn.db(process.env.DB_NAMEM))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
module.exports = mongoConnection;
