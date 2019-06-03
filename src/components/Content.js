/**
 * Main component. With Router implementations
 */

// Libraries
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Local components
import Storage from './common/Storage.js';
import Header from './Header/Header.js';
import Footer from './common/Footer.js';
import { showLoader, hideLoader } from './common/functions.js';
import ExtendedRoute from './common/ExtendedRoute.js';

import HomePage from './HomePage/HomePage.js';
import FavoritePage from './FavoritePage/FavoritePage.js';
import ProductPage from './ProductPage/ProductPage.js';
import OrderPage from './OrderPage/OrderPage.js';
import CataloguePageWithFilter from './CataloguePage/CataloguePage.js';

// Variables
const Constants = require('./common/constants.js');

const { apiUrl } = Constants;


// Storage.clear('favorites');
const headerParams = {
  topMenuItems: [
    { url: '#', title: 'Возврат' },
    { url: '#', title: 'Доставка и оплата' },
    { url: '#', title: 'О магазине' },
    { url: '#', title: 'Контакты' },
    { url: '#', title: 'Новости' },
  ],
  phone: '+7 495 79 03 5 03',
  workingHours: 'Ежедневно: с 09-00 до 21-00',
};

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartId: Storage.getString('cartId', null),
      cartItems: [],
      orders: Storage.getArray('orders', []),
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleCartItemRemove = this.handleCartItemRemove.bind(this);
    this.handleCartItemUpdate = this.handleCartItemUpdate.bind(this);
    this.saveOrder = this.saveOrder.bind(this);
  }

  handleCartItemUpdate(aId, aSize, aAmount) {
    this.updateCartItem(aId, aSize, aAmount);
  }

  handleAddToCart(aId, aSize, aAmount) {
    const { cartItems } = this.state;
    const item = cartItems.find(el => (el.id === aId && el.size === aSize));
    const newAmount = aAmount + ((item !== undefined) ? item.amount : 0);
    this.updateCartItem(aId, aSize, newAmount);
  }

  handleCartItemRemove(event, aKey) {
    const { cartItems } = this.state;
    const item = cartItems.find(el => (`${el.id}-${el.size}`) === aKey);

    if (item !== undefined) {
      this.updateCartItem(item.id, item.size, 0);
    }

    event.preventDefault();
  }

  // хороним инфу о заказе по завершении
  saveOrder(aData, aEmail) {
    const data = aData;
    this.sendEmailNotification(data, aEmail);
    data.email = aEmail;
    Storage.addToArray('orders', data);
    Storage.clear('cartId');
    this.setState({
      cartId: null,
      cartItems: [],
      orders: this.state.orders.push(data),
    });
    window.location = `/order/${data.id}`;
  }

  // Шлем ее ему в туда
  sendEmailNotification(aData) {
    return aData;
    // ... some code to push an email with order information to the customer
  }

  updateCartItem(aId, aSize, aAmount) {
    const { cartId } = this.state;
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: +aId, size: +aSize, amount: +aAmount }),
    };
    showLoader();
    fetch(`${apiUrl}/cart/${cartId || ''}`, init)
      .then(result => result.json())
      .then((json) => {
        hideLoader();
        if (json.status === 'ok') {
          if (json.data.products) {
            // Если корзина уже существует, то просто обновим список продуктов
            // this.setState({ cartItems: json.data.products });
            this.updateCartData(json.data.products);
          } else if (json.data.id && !cartId) {
            // Если корзина не существовала, то сохраним айдишник новой корзины
            if (!cartId || cartId !== json.data.id) {
              Storage.getString('cartId', json.data.id);
              this.setState({ cartId: json.data.id });
            }
            // ... и запросим список продуктов в корзине
            this.updateCart();
          }
        } else if (json.status === 'error' && json.message) {
          // Корзина с ID -LYLWcnck9LWrnwTMVNc не найдена
          if (/(Корзина с ID )[^\s]+( не найдена)/.test(json.message)) {
            Storage.clear('cartId');
            this.setState({ cartId: null, cartItems: [] });
          } else {
            alert(json.message);
          }
        }
      });
  }

  updateCart() {
    const { cartId } = this.state;
    if (cartId === null) return null;

    showLoader();
    fetch(`${apiUrl}/cart/${cartId}`)
      .then(result => result.json())
      .then((json) => {
        if (json.status === 'ok') {
          if (json.data.products && json.data.products.length > 0) {
            // this.setState({ cartItems: json.data.products });
            this.updateCartData(json.data.products);
          }
        } else if (json.status === 'error' && json.message) {
          // Корзина с ID -LYLWcnck9LWrnwTMVNc не найдена
          if (/(Корзина с ID )[^\s]+( не найдена)/.test(json.message)) {
            Storage.clear('cartId');
            this.setState({ cartId: null, cartItems: [] });
          } else {
            alert(json.message);
          }
        }
      });
    return null;
  }

  updateCartData(aItems) {
    if (!aItems.length) return null;
    const params = [];
    for (let i = 0; i < aItems.length; i += 1) {
      params.push({ key: `id[${i}]`, value: aItems[i].id });
    }
    const queryString = params.map(
      p => (`${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`),
    )
      .join('&');
    const endpoint = `/products/?${queryString}`;

    fetch(apiUrl + endpoint)
      .then(response => response.json())
      .then((json) => {
        hideLoader();
        if (json.status === 'ok') {
          this.combineCartData(aItems, json.data);
        } else if (json.status === 'error') {
          alert(json.message);
        }
      });

    return null;
  }

  combineCartData(aItems, aProducts) {
    const cartItemsPrepared = aItems.map((el) => {
      const el2 = aProducts.find(o => o.id === el.id);
      if (el2 !== undefined) {
        Object.assign(el, el2);
      }
      return el;
    });
    this.setState({ cartItems: cartItemsPrepared });
  }

  componentDidMount() {
    this.updateCart();
    hideLoader();
  }

  render() {
    const { cartId, cartItems, orders } = this.state;
    // const cartProps = { addToCart: this.addToCart };
    return (
      <BrowserRouter>
        <div>
          <Header
            {...headerParams}
            cartItems={cartItems}
            onRemoveItem={this.handleCartItemRemove}
          />
          <Switch>
            <ExtendedRoute
              path="/product/:id"
              component={ProductPage}
              routeProps={{
                addToCart: this.handleAddToCart,
              }}
            />
            <Route path="/favorite/:page?" component={FavoritePage} />
            <Route path="/catalogue/:category?" component={CataloguePageWithFilter} />
            <ExtendedRoute
              path="/order/:orderId?"
              component={OrderPage}
              routeProps={{
                onCartItemUpdate: this.handleCartItemUpdate,
                cartId,
                cartItems,
                orders,
                saveOrder: this.saveOrder,
              }}
            />
            <Route path="*" component={HomePage} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
