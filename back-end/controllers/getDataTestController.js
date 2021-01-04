const getDataTestController = async (req, res) => {
  console.log('entrou aqui na rota de TESTE');
  try {
    const { email, total, address, number, date, products } = req.body;
    console.log(
      'AQUI DADOS DA API',
      email,
      total,
      address,
      number,
      date,
      products,
    );

    return res
      .status(201)
      .json({ email, total, address, number, date, products });
  } catch (_e) {
    return res.status(400).json({ message: 'thats something whrong here' });
  }
};

module.exports = getDataTestController;
