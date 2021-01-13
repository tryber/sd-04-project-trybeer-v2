import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/** Styled Components */
import {
  Sale,
  SaleInfoLabel,
  SaleInfo,
  Sales,
  StatusSignal,
  ExpandButton,
  SaleDetails,
} from './styledComponents';

const zero = 0;
const two = 2;
const ten = 10;

const SalesTable = ({ title, sales }) => {
  const [selectedSale, setselectedSale] = useState({});
  const history = useHistory();

  const handleRedirect = (saleId) => history.push(`/admin/orders/${saleId}`);

  return (
    <div>
      <h2>{title}</h2>
      <Sales>
        <thead>
          <tr>
            <SaleInfoLabel position="center">ID Pedido</SaleInfoLabel>
            <SaleInfoLabel position="left">Data Pedido</SaleInfoLabel>
            <SaleInfoLabel position="center">Status Pedido</SaleInfoLabel>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => {
            const dateLength = sale.sale_date.length;
            const newDate = new Date(
              sale.sale_date.slice(zero, dateLength - ten),
            );
            const day = `0${newDate.getDate()}`.slice(-two); // Add 0 if day <10
            const month = `0${newDate.getMonth()}${1}`.slice(-two); // Add 0 if month <10
            const saleDate = `${day}/${month}`;
            return (
              <>
                <Sale key={ sale.id } onClick={ () => handleRedirect(sale.id) }>
                  <SaleInfo
                    size="10%"
                    position="center"
                    data-testid={ `${index}-order-number` }
                  >
                    {`Pedido ${sale.id}`}
                  </SaleInfo>
                  <SaleInfo size="75%" position="left">
                    {`${saleDate.toLocaleString('pt-BR')}`}
                  </SaleInfo>
                  <SaleInfo size="15%" position="center">
                    <h3 data-testid={ `${index}-order-status` }>{sale.status}</h3>
                    <ExpandButton
                      onClick={ () => setselectedSale({
                        ...selectedSale,
                        [sale.id]: !selectedSale[sale.id],
                      }) }
                    >
                      {selectedSale[sale.id] ? '-' : '+'}
                    </ExpandButton>
                    <StatusSignal status={ sale.status } />
                  </SaleInfo>
                </Sale>
                <SaleDetails display={ selectedSale[sale.id] }>
                  <td colSpan="2">
                    Valor Compra:
                    <span data-testid={ `${index}-order-total-value` }>
                      {`R$ ${sale.total_price
                        .toFixed(two)
                        .toString()
                        .replace('.', ',')}`}
                    </span>
                    Endereço de entrega:
                    <span data-testid={ `${index}-order-address` }>
                      {`${sale.delivery_address}, ${sale.delivery_number}`}
                    </span>
                  </td>
                </SaleDetails>
              </>
            );
          })}
        </tbody>
      </Sales>
    </div>
  );
};

SalesTable.propTypes = {
  sales: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default SalesTable;
