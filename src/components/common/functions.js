/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["img", "button", "f", "arrows"] }] */


import React from 'react';
import { Link } from 'react-router-dom';

// Variables
const Constants = require('./constants.js');

const { apiUrl } = Constants;


/**
 * Additional functions
 */


export const slider = (f, img, button, V, Vo, arrows) => {
  let iii = 0;
  let start = null;
  let clear = 0;

  window.requestAnimationFrame = (function requestAnimationFrameHC() { // для поддержки requestAnimationFrame всеми браузерами
    return window.requestAnimationFrame
            || function alternativeAnimationTimeout(callback) {
              return window.setTimeout(callback, 1000 / 60);
            };
  }());

  function step(time) {
    if (start === null) start = time;
    const progress = time - start;
    if (progress > V) {
      start = null;
      for (let i = 0; i < img.length; i += 1) {
        img[i].style.zIndex = '0';
        button[i].style.opacity = '0.5';
      }
      img[iii].style.zIndex = '1';
      iii = ((iii !== (img.length - 1)) ? (iii + 1) : 0);
      img[iii].style.zIndex = '2';
      img[iii].style.opacity = '0';
      button[iii].style.opacity = '1';
    } else if (img[iii].style.opacity !== '') {
      img[iii].style.opacity = ((progress / Vo < 1) ? (progress / Vo) : 1);
    }
    if (!(clear !== '0' && progress > Vo)) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);

  f.onmouseenter = function onMouseEnterListener() {
    if (clear === '0') clear = '1';
  }; // при наведении на слайдер

  f.onmouseleave = function onMouseLeaveListener() {
    if (clear === '1') {
      clear = '0';
      requestAnimationFrame(step);
    }
  }; // курсор убран со слайдера

  function btnOnClickListener() {
    for (let i = 0; i < img.length; i += 1) {
      img[i].style.zIndex = '0';
      button[i].style.opacity = '0.5';
    }
    iii = +this.value;
    img[this.value].style.zIndex = '2';
    button[this.value].style.opacity = '1';
  }
  function arrow1OnClickListener() {
    img[iii].style.zIndex = '0';
    button[iii].style.opacity = '0.5';
    iii -= 1;
    iii = ((iii < 0) ? img.length - 1 : iii);
    img[iii].style.zIndex = '2';
    button[iii].style.opacity = '1';
  }
  function arrow2OnClickListener() {
    img[iii].style.zIndex = '0';
    button[iii].style.opacity = '0.5';
    iii += 1;
    iii = ((iii === img.length) ? 0 : iii);
    img[iii].style.zIndex = '2';
    button[iii].style.opacity = '1';
  }

  for (let j = 0; j < button.length; j += 1) { // при нажатии кнопок
    button[j].onclick = btnOnClickListener;
    arrows[0].onclick = arrow1OnClickListener;
    arrows[1].onclick = arrow2OnClickListener;
  }
};


export const showLoader = () => {
  // preloader_wrapper show
  document.querySelector('.preloader_wrapper').classList.remove('hidden');
};


export const hideLoader = () => {
  // preloader_wrapper hide
  document.querySelector('.preloader_wrapper').classList.add('hidden');
};


export const formatPrice = (aPrice, aEnding) => {
  let ending = aEnding;
  ending = ending !== undefined ? ending : ' ₽';
  return aPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ending;
};


// Определение окончания "числительного"
export const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20)
    ? 2
    : cases[(number % 10 < 5) ? number % 10 : 5]];
};


// Плашка для управления количеством продукта
export const QuantirySwitcher = ({ quantity, onQuantityDecrease, onQuantityIncrease }) => (
    <div className="basket-item__quantity">
      <div
        className="basket-item__quantity-change basket-item-list__quantity-change_minus"
        onClick={onQuantityDecrease}>-</div>
      {quantity}
      <div
        className="basket-item__quantity-change basket-item-list__quantity-change_plus"
        onClick={onQuantityIncrease}>+</div>
    </div>
);


export const withData = (
  endpoint,
  dataToState,
  isChangeable,
) => Component => class extends React.Component {
  constructor(props) { super(props); this.state = {}; }

  static get displayName() {
    const name = Component.displayName || Component.name || 'Component';
    return `WithData(${name})`;
  }

  fetchData(props) {
    // https://neto-api.herokuapp.com/bosa-noga';
    // const apiUrl = 'http://api-neto.herokuapp.com/bosa-noga';
    let endendpoint;
    if (typeof endpoint === 'function') {
      endendpoint = endpoint(props);
    } else {
      endendpoint = endpoint;
    }
    showLoader();
    fetch(apiUrl + endendpoint)
      .then(result => result.json())
      .then((json) => {
        if (json.status === 'ok') {
          this.setState(dataToState(json.data));
        } else {
          alert(json.message);
        }
        hideLoader();
      });
  }

  componentWillReceiveProps(newProps) {
    if (isChangeable) {
      this.fetchData(newProps);
    }
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  render() {
    return <Component {...this.props} {...this.state} />;
  }
};

withData.defaultProps = {
  isChangeable: true,
};


export const SitePath = ({ title, url, middlePath }) => {
  const rootPath = { title: 'Главная', url: '/' };
  let path = [rootPath];
  if (middlePath.length) {
    path = path.concat(middlePath);
  }
  path.push({ title, url });
  return (
    <div className="site-path">
      {/* Breadcrumbs */}
      <ul className="site-path__items">
        {path.map((pathItem, i) => (
            <li key={i} className="site-path__item">
              <Link to={pathItem.url}>{pathItem.title}</Link>
            </li>
        ))}
      </ul>
    </div>
  );
};

SitePath.defaultProps = {
  middlePath: [],
};
