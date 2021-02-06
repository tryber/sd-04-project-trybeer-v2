import React from 'react';
import LinkBtn from '../../LinkBtn';

const Links = () => (
  <>
    <LinkBtn route="/products" testid="side-menu-item-products">
      Produtos
    </LinkBtn>
    <LinkBtn route="/orders" testid="side-menu-item-my-orders">
      Meus pedidos
    </LinkBtn>
    <LinkBtn route="/profile" testid="side-menu-item-my-profile">
      Meu Perfil
    </LinkBtn>
    <LinkBtn route="/chat" testid="side-menu-chat">
      Conversar com a loja
    </LinkBtn>
  </>
);

export default Links;
