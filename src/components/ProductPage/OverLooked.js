import React from 'react';
import { Link } from 'react-router-dom';

import Storage from '../common/Storage.js';

// Слайдер "Вы смотрели"
class OverLooked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      current: 0,
    };
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
  }

  // Формирование url для запроса данных
  productsEndpoint(list) {
    let result = '/products/';
    const params = [];

    for (let i = 0; i < list.length; i++) {
      params.push({ key: `id[${i}]`, value: list[i] });
    }

    const queryString = params.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&');
    result += (queryString.length ? `?${queryString}` : '');

    return result;
  }

  // От списка айдишников до реестра продуктов
  getItemsList(list) {
    // const apiUrl = 'http://api-neto.herokuapp.com/bosa-noga';

    if (list === undefined || list.length == 0) return null;
    const endpoint = this.productsEndpoint(list);
    fetch(apiUrl + endpoint)
      .then(response => response.json())
      .then((json) => {
        if (json.status == 'ok') {
          const items = json.data;

          this.setState(items);
        } else {
          alert(json.message);
        }
      });
  }

  componentDidMount() {
    this.getItemsList(Storage.getOverlooked());
  }

  handleLeftArrowClick(event) {
    event.preventDefault();
    let current = this.state.current - 1;
    if (current < 0) current = 0;
    this.setState({ current });
  }

  handleRightArrowClick(event) {
    event.preventDefault();
    let current = this.state.current + 1;
    if (current > this.state.items - 5) current = this.state.items - 5;
    this.setState({ current });
  }

  render() {
    const { items, current } = this.state;
    if (items.length == 0) return null;

    return (
      <section className="product-card__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          {(items.length > 5 && current > 0)
            ? (<div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow" onClick={this.handleLeftArrowClick}></div>)
            : null}
          {items.map((item) => {
            <div key={item.id} className="overlooked-slider__item" style={{ backgroundImage: `url(${item.images[0]})` }}>
              <Link to={`/product-card-desktop/${item.id}`}></Link>
            </div>;
          })}
          {(items.length > 5 && current < items.length - 5)
            ? (<div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow" onClick={this.handleRightArrowClick}></div>)
            : null}
        </div>
      </section>
    );
  }
}

export default OverLooked;
