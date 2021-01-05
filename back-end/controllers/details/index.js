const { sales } = require('../../models');

const getDetailController = async (req, res) => {
  try {
    const { id } = req.params;
    const prodInfo = await sales.findByPk(id);

    if (prodInfo) {
      return res.status(200).json(prodInfo);
    }
    return res.status(500).json({ message: 'I have bad news' });
  } catch (error) {
    return res.status(500).json({ message: 'I have bad news' });
  }
};

const postDetailController = async (req, res) => {
  try {
    const { status } = req.body;
    // console.log('REQ: ', req);
    await sales.update(
      { status },
      { where: { id: req.params.id } },
    );
    res.status(200).json({});
  } catch (error) {
    return res.status(500).json({ message: 'I have bad news' });
  }
};

module.exports = { getDetailController, postDetailController };
