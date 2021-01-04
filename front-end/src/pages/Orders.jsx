import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getUserSales } from '../services/TrybeerApi';
import ListSales from '../components/ListSales';
import '../css/orders.css';

export default function Orders() {
  const [sales, setSales] = useState([]);
  const { email } = JSON.parse(localStorage.getItem('user') || '{}');
  useEffect(() => {
    getUserSales(email).then(({ data }) => setSales(data));
  }, [email]);
  return (
    <div className="page">
      <Header>Meus Pedidos</Header>
      {sales.length < 1 && (
        <div className="orders-page">
          <span className="noOrders">
            &quot;A culpa é minha e eu coloco ela em quem eu quiser!&quot;
            <br />
            (Voce nao tem pedidos ainda)
          </span>
        </div>
      )}
      {sales.length > 0 && (
        <div className="orders-page page-content">
          <div className="container">
            <h5>&quot;Ao álcool... A causa e solução de todos os problemas&quot;</h5>
          </div>
          <ul className="flex">
            {sales
              && sales.map((result, index) => (
                <li className="listRemove" key={ result.id }>
                  <ListSales result={ result } index={ index } />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
