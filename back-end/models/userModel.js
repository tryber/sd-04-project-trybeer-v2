const { connection } = require('./connection');

const registerNewUser = async (userName, userEmail, userPwd, role) => {
  try {
    const db = await connection();
    await db
      .getTable('users')
      .insert(['name', 'email', 'password', 'role'])
      .values(userName, userEmail, userPwd, role)
      .execute();
    return { name: userName, email: userEmail, password: userPwd, role };
  } catch (err) {
    throw new Error(err);
  }
};

const updateUser = async (userId, userName) => {
  const db = await connection();
  await db
    .getTable('users')
    .update()
    .set('name', userName)
    .where('id = :id')
    .bind('id', userId)
    .execute();
};

module.exports = { registerNewUser, updateUser };
