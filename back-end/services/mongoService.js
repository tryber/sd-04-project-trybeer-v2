const { ObjectId } = require('mongodb');
const connection = require('./connection');
​
const getBy = (collection, field, info) => connection()
  .then((db) => db.collection(collection).findOne({ [field]: info }));
​
const getAll = (collection, projection = {}) => connection()
  .then((db) => db.collection(collection).find({}, { projection }).toArray());
​
const addNew = (collection, info) => connection()
  .then((db) => db.collection(collection).insertOne(info))
  .then(((result) => result.ops[0]));
​
const update = (collection, id, info) => {
  if (!ObjectId.isValid(id)) throw new Error('Invalid id');
  return connection().then((db) => db.collection(collection)
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: info }, { returnOriginal: false }));
};
​
const remove = async (collection, id) => {
  if (!ObjectId.isValid(id)) throw new Error('Invalid id');
  const { deletedCount } = await connection()
    .then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) }));
  return deletedCount;
};
​
module.exports = { getBy, addNew, getAll, update, remove };