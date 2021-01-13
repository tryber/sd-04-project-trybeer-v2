const { sale } = require('../models');

const allSalesSev = async () => {
  const sales = await sale.findAll({
    attributes: { exclude: ['userId'] },
  });

  return sales;
};

const finishSalesServ = async (id, total, address, number) => {
  const totalToInsert = total.replace(',', '.');

  const dateNow = new Date();
  const date = `${dateNow.getFullYear()}-${
    dateNow.getMonth() + 1
  }-${dateNow.getDate()} - ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;

  const checkout = await sale.create({
    user_id: id,
    total_price: totalToInsert,
    delivery_address: address,
    delivery_number: number,
    sale_date: date,
    status: 'Pendente',
  });

  const AllSales = await sale.findAll({
    attributes: { exclude: ['userId'] },
  });
  const newSale = await AllSales.filter((elem) => elem.user_id === id);

  const saleResponse = {
    ...checkout,
    saleId: newSale[newSale.length - 1].id,
  };

  return saleResponse.dataValues;
};

const updateStatusServ = async (id, status) => {
  await sale.update(
    {
      status,
    },
    { where: { id } },
  );

  return { message: status };
};

module.exports = {
  allSalesSev,
  finishSalesServ,
  updateStatusServ,
};
