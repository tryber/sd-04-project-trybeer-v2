import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Chat, Checkout, Login, NotFound, Orders, OrdersDetails, Products, Profile, Register,
} from '../pages';
import { ProductProvider } from '../context';

/*
Talvez fazer uma página (pages) de Chat e ir refatorando conforme os requisitos?

CLIENTE
  OK - Criar rota /chat
  OK - Adicionar ao menu lateral, uma botão de chat denominada
  'Conversar com a loja'(data-testid="side-menu-chat"),
  que leva para a rota /chat
  - O histórico da conversa deve ser salvo no banco de dados MondoDB
  e aparecer quando a pessoa abre a página.
  - A maioria das funcionalidades são similares ao projeto webchat.
  DATA-TESTIDs:
    - O elemento com o nickname do cliente deverá conter a tag data-testid="nickname"
    - O elemento com a data da mensagem deverá conter a tag data-testid="message-time"
    - O elemento com a mensagem do cliente deverá conter a tag data-testid="text-message"
    - O input de escrever a mensagem deverá conter a tag data-testid="message-input"
    - O botão para enviar a mensagem deverá conter a tag data-testid="send-message"

ADMIN
  OK - A rota da tela deve ser /admin/chats
  OK - A plataforma deve ter acessível, no menu lateral, uma funcionalidade
  de chats denominada 'Conversas'(data-testid="side-menu-item-chat"),
  que leva para a rota /admin/chats
  - Mostrar todas as conversas da mais recente para a mais antiga.
  - Ao clicar em uma conversa mostrar a conversa, igual a um chat.
  DATA-TESTIDs:
    - O campo input de mensagem deverá conter a tag data-testid="chat-message"
    - O botão de enviar mensagem deverá conter a tag data-testid="send-message-btn"
    - O email da mensagem deverá conter a tag data-testid="nickname"
    - A hora da mensagem deverá conter a tag data-testid="message-time"
    - O texto da mensagem deverá conter a tag data-testid="text-message"
    - O botão voltar deverá conter a tag data-testid="back-button"
*/

const Routes = () => (
  <BrowserRouter>
    <ProductProvider>
      <ChakraProvider>
        <Switch>
          <Login exact path="/" />
          <Checkout path="/checkout" />
          <Login path="/login" />
          <Orders exact path="/orders" />
          <Route path="/orders/:id">
            <OrdersDetails />
          </Route>
          <Orders exact path="/admin/orders" />
          <Route path="/admin/orders/:id">
            <OrdersDetails />
          </Route>
          <Profile path="/admin/profile" />
          <Products path="/products" />
          <Profile path="/profile" />
          <Register path="/register" />
          <Chat exact path="/chat" />
          <Chat exact path="/admin/chats" />
          <Route component={ NotFound } />
        </Switch>
      </ChakraProvider>
    </ProductProvider>
  </BrowserRouter>
);

export default Routes;
