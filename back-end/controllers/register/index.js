const { createToken } = require('../../middlewares/createJWT');
const { add, getByEmail } = require('../../models/users');

const register = async (req, res) => {
  try {
    const { signName, signEmail, signPassword, signRole } = req.body;
    // signRole é boolean
    // signRole - true -> 'administrator'
    // signRole - false -> 'client'
    const role = signRole ? 'administrator' : 'client';

    // Verifica se existe usuário com o mesmo email
    const user = await getByEmail(signEmail);

    if (user.email) {
      return res.status(200).json({ message: 'E-mail already in database.' });
    }

    await add(signName, signEmail, signPassword, role);

    const newUser = await getByEmail(signEmail);
    const { password: _, ...userWithoutPassword } = newUser;
    const token = createToken(userWithoutPassword);

    return res.status(201).json(token);
  } catch (_error) {
    console.log(_error.message);
    res.status(501).json({ message: 'Falha ao cadastrar usuário' });
  }
};

module.exports = { register };
