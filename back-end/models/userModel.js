const connection = require('./connection');

const findUserByEmail = async (emailInput) => {
  try {
    const db = await connection();
    const result = await db
      .getTable('users')
      .select([])
      .where('email = :email')
      .bind('email', emailInput)
      .execute();
    const [id, name, email, password, role] = await result.fetchOne();
    return { id, name, email, password, role };
  } catch (err) {
    console.error(err);
    return null;
  }
};

const findByUserIdModel = async (idUser) => {
  console.log('ENTROU NO MODEL');
  const db = await connection();
  const result = await db
    .getTable('users')
    .select([])
    .where('id = :id')
    .bind('id', idUser)
    .execute();
  const [id, name, email, password, role] = await result.fetchOne();
  return { id, name, email, password, role };
};

const saveUpdateModel = async (name, email) => {
  console.log('entrou no UPDATEMODEL', name, email);
  const db = await connection();
  await db
    .getTable('users')
    .update()
    .set('name', name)
    .where('email = :email')
    .bind('email', email)
    .execute();
};
const registerUser = async (name, email, password, role) => {
  try {
    const db = await connection();
    const table = await db.getTable('users');
    const result = await table
      .insert(['name', 'email', 'password', 'role'])
      .values(name, email, password, role)
      .execute();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  findUserByEmail,
  findByUserIdModel,
  saveUpdateModel,
  registerUser,
};
