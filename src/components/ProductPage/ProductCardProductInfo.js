import React from 'react';

import { QuantirySwitcher } from '../common/functions.js';
import Price from './Price.js';


const ProductCardProductInfo = ({
  product,
  addToCart,
  selectedSize,
  onSizeSelect,
  onQuantityIncrease,
  onQuantityDecrease,
  quantity,
  showTip }) => (
    <div className="main-screen__product-info">
      <div className="product-info-title">
        <h2>Ботинки женские</h2>
        { product.feature ? (<div className="in-stock">В наличии</div>) : null }
      </div>
      <div className="product-features">
        <table className="features-table">
          <tbody>
            <tr>
              <td className="left-col">Артикул:</td>
              <td className="right-col">{product.sku}</td>
            </tr>
              <tr>
              <td className="left-col">Производитель:</td>
              <td className="right-col">
                <a href="#"><span className="producer">{product.brand}</span></a>
              </td>
            </tr>
              <tr>
              <td className="left-col">Цвет:</td>
              <td className="right-col">{product.color}</td>
            </tr>
              <tr>
              <td className="left-col">Материалы:</td>
              <td className="right-col">{product.material}</td>
            </tr>
              <tr>
              <td className="left-col">Сезон:</td>
              <td className="right-col">{product.season}</td>
            </tr>
              <tr>
              <td className="left-col">Повод:</td>
              <td className="right-col">{product.reason}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="size">Размер</p>
      <ul className="sizes">
        { product.sizes.map((item) => {
          if (item.available) {
            return (
              <li key={item.size} className={ (item.size === selectedSize) ? 'active' : null }>
                <a href="#" onClick={onSizeSelect}>{item.size}</a>
              </li>
            );
          }
          return (<li key={item.size} style={{ opacity: '0.6' }}>{item.size}</li>);
        }) }
      </ul>
      <div className="size-wrapper">
        <a href="#"><span className="size-rule"></span>
        <p className="size-table">Таблица размеров</p></a>
      </div>
      <div className="in-favourites-wrapper">
        <div className="favourite favorite_chosen"></div>
        <p className="in-favourites">В избранное</p>
      </div>
      <QuantirySwitcher
        quantity={quantity}
        onQuantityDecrease={onQuantityDecrease}
        onQuantityIncrease={onQuantityIncrease} />
      <Price value={quantity * product.price}/>
      <button
        className={`in-basket in-basket-click ${
          (selectedSize === null)
            ? 'in-basket_disabled'
            : ''
        }`}
        onClick={addToCart}
      >{(showTip) ? 'Выберите размер!' : 'В корзину'}</button>
    </div>
);


export default ProductCardProductInfo;
