import React from 'react';
// import { Link } from 'react-router-dom';


import ProductCardWithData from './ProductCard.js';
// import Similar from './Similar.js';
// import OverLooked from './OverLooked.js';


import '../../css/style-product-card.css';

// import Storage from '../common/Storage.js';
// import { SitePath, showLoader, hideLoader, declOfNum } from '../common/functions.js';

// const Constants = require('../common/constants.js');
// const { apiUrl } = Constants;


class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: (this.props.match && this.props.match.params && this.props.match.params.id)
        ? this.props.match.params.id
        : null,
    };
  }

  render() {
    const { id } = this.props.match && this.props.match.params ? this.props.match.params : null;
    const { addToCart } = this.props;

    if (!id) return null;
    return (
      <div>
        {/* <!-- Карточка товара --> */}
        <ProductCardWithData id={id} addToCart={addToCart}/>
        {/* <!-- Слайдеры внизу карточки  --> */}
        {/* <OverLooked />
        <Similar /> */}
      </div>
    );
  }
}

export default ProductPage;


/* class BreadCrumbs extends React.Component {
  render() {
    return (
      <div className="site-path">
        <ul className="site-path__items">
        <li className="site-path__item"><Link to="/">Главная</Link></li>
        <li className="site-path__item"><Link to="#">Женская обувь</Link></li>
        <li className="site-path__item"><Link to="#">Ботинки</Link></li>
        <li className="site-path__item"><Link to="#">Ботинки женские</Link></li>
        </ul>
      </div>
    );
  }
} */
