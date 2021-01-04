const { updateUser, getById } = require('../../models/users');
const { createToken } = require('../../middlewares/createJWT');

const userUpdate = async (req, res) => {
  // const { id } = req.user; -> O id deverá vir do body
  const { id, name } = req.body;
  console.log(req.body);
  try {
    await updateUser(id, name);
    const newUser = await getById(id);
    const { password: _, ...userWithoutPassword } = newUser;
    const token = createToken(userWithoutPassword);
    res.status(200).json(token);
  } catch {
    res.status(500).json({ message: 'Falha ao atualizar o usuário' });
  }
};

module.exports = { userUpdate };
