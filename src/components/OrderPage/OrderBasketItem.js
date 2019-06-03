import React from 'react';
import { Link } from 'react-router-dom';

import { formatPrice, QuantirySwitcher } from '../common/functions.js';


const OrderBasketItem = ({ item, onQuantityDecrease, onQuantityIncrease }) => (
    <div className="basket-item">
      <div className="basket-item__pic">
        <img src={item.images[0]} alt={`product_${item.id}`} />
      </div>
      <div className="basket-item__product">
        <div className="basket-item__product-name">
          <Link to={`/product/${item.id}`}>{item.title}</Link>
        </div>
        <div className="basket-item__product-features">
          <div className="basket-item__size">Размер: <span>{item.size}</span></div>
          <div className="basket-item__producer">Производитель: <span>{item.brand}</span></div>
          {item.color
            ? <div className="basket-item__color">Цвет: <span>{item.color}</span></div>
            : null
          }
        </div>
      </div>
      <QuantirySwitcher
        quantity={item.amount}
        onQuantityDecrease={onQuantityDecrease}
        onQuantityIncrease={onQuantityIncrease}
      />
      <div className="basket-item__price">
        {formatPrice(item.price * item.amount, '')}
        <i className="fa fa-rub" aria-hidden="true"></i>
      </div>
    </div>
);

export default OrderBasketItem;
