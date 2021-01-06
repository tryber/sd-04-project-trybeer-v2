const Mongo = require('../services/mongoService');

const listCollections = async (_req, res) => {
    const collection = await Mongo.listCollection();
    console.log(collection)
}