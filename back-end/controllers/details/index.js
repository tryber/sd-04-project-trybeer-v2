const { getDetail, updateSale } = require('../../models/details');

const getDetailController = async (req, res) => {
  try {
    const { id } = req.params;
    const prodInfo = await getDetail(id);

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
    const { id } = req.params;
    await updateSale(id);
    res.status(200).json({});
  } catch (error) {
    return res.status(500).json({ message: 'I have bad news' });
  }
};

module.exports = { getDetailController, postDetailController };
