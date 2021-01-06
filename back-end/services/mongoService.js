const connection = require('./connection');

const addNew = async (collection, info) =>
  connection()
    .then((db) => db.collection(collection).insertOne(info))
    .then((result) => result.ops[0]);

const getAll = async (collection) =>
  connection().then((db) => db.collection(collection).find({}).toArray());

module.exports = { addNew, getAll };
