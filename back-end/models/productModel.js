const connection = require('./connection');

const findAllProducts = async () => {
  try {
    const db = await connection();
    const table = await db.getTable('products');
    const results = await table.select([]).execute();
    const products = await results.fetchAll();
    return products.map(([id, name, price, urlImage]) => ({
      id,
      name,
      price,
      urlImage,
    }));
  } catch (err) {
    console.error(err);
    return null;
  }
};

const findProductById = async (productId) => {
  try {
    const db = await connection();
    const table = await db.getTable('products');
    const result = await table.select([])
      .where('id = :id')
      .bind('id', productId)
      .execute();
    const [id, name, price, urlImage] = await result.fetchOne();
    return {
      id, name, price, urlImage,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

const findProductsByName = async (productName) => {
  try {
    const db = await connection();
    const allTable = await db.getTable('products')
      .select(['id', 'name', 'price', 'url_image'])
      .where('name like :name')
      .bind('name', `%${productName}%`)
      .execute();
    const results = allTable.fetchAll();
    const products = results.map(([id, name, price, urlImage]) => ({
      id, name, price, urlImage,
    }));
    return products;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  findAllProducts,
  findProductById,
  findProductsByName,
};
