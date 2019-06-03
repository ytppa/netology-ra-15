import React from 'react';

import ProductCatalogueItemList from '../FavoritePage/ProductCatalogueItemList.js';
import CatalogueSidebar from './CatalogueSidebar.js';

import '../../css/style-catalogue.css';

import Storage from '../common/Storage.js';
import { SitePath, showLoader, hideLoader, withData /* , declOfNum */ } from '../common/functions.js';

const Constants = require('../common/constants.js');

const { apiUrl } = Constants;


class CataloguePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: Storage.getString('catalogue-sortBy', 'price'),
      items: [],
      total: 0,
      pages: 0,
      page: 1,
    };
    this.handleFavoriteProductSwitch = this.handleFavoriteProductSwitch.bind(this);
    this.handleSortBySelect = this.handleSortBySelect.bind(this);
  }

  // Формирование url для запроса данных
  productsEndpoint(newState) {
    let { page, sortBy } = this.state;
    // favorites = Storage.getFavorites();
    let result = '/products/';
    const params = [];

    /* for (let i = 0; i < favorites.length; i += 1) {
      params.push({ key: `id[${i}]`, value: favorites[i] });
    } */

    if (newState !== undefined && newState.page) ({ page } = newState);
    if (newState !== undefined && newState.sortBy) ({ sortBy } = newState);

    if (sortBy !== undefined) params.push({ key: 'sortBy', value: sortBy });
    if (page !== undefined) params.push({ key: 'page', value: page });

    const queryString = params.map(
      p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`,
    )
      .join('&');
    // Object.keys(params).map(key => key + '=' + params[key]).join('&');
    result += (queryString.length ? `?${queryString}` : '');

    return result;
  }

  getItemsList(newState) {
    // const apiUrl = 'http://api-neto.herokuapp.com/bosa-noga',
    const state = newState;

    const endpoint = this.productsEndpoint(state);

    showLoader();
    fetch(apiUrl + endpoint)
      .then(response => response.json())
      .then((json) => {
        if (json.status === 'ok') {
          state.items = json.data;
          state.pages = json.pages;
          state.total = json.goods;
          hideLoader();
          this.setState(state);
        } else {
          alert(json.message);
        }
      });
    return true;
  }

  componentWillReceiveProps(newProps) {
    const { page } = newProps.match.params;

    if (page === undefined && this.state.page > 1) {
      this.getItemsList({ page: 1 });
    } else if (page > 1 && this.state.page === 1) {
      this.getItemsList({ page });
    }
  }

  componentDidMount() {
    this.getItemsList({});
  }

  handleSortBySelect(event) {
    console.log(event.currentTarget.value);
    this.getItemsList({ sortBy: event.currentTarget.value });
    // this.setState({ sortBy: event.currentTarget.value })
  }

  handleFavoriteProductSwitch(event, aId) {
    event.preventDefault();
    const { items } = this.state;
    const i = items.findIndex(el => el.id === aId);

    if (i !== -1) {
      items.splice(i, 1);
      if (Storage.isFavorite(aId)) {
        Storage.switchFavorite(aId);
      }
      this.setState({ items });
    }
  }

  render() {
    const { title, items, filters } = this.state;
    document.title = this.state.title;

    // http://api-neto.herokuapp.com/bosa-noga/products?id[0]=36&id[1]=21&id[2]=60&id[3]=63&sortBy=popularity
    return (
      <div>
        <SitePath title={title} url={this.props.match.url} />
        {/* <!-- Тело каталога с сайдбаром --> */}
        <main className="product-catalogue">
          <CatalogueSidebar
            filters={filters}
          />
          {/* <!-- Основной контент каталога --> */}
          <section className="product-catalogue-content">
            {/* <!-- Голова каталога с названием раздела и сортировкой --> */}
            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">
                  Женская обувь</h2><span className="amount"> 1 764 товара</span>
              </div>
              <div className="product-catalogue__sort-by">
                <p className="sort-by">Сортировать</p>
                <select name="" id="sorting">
                  <option value="">по популярности</option>
                  <option value="">по размеру</option>
                  <option value="">по производителю</option>
                </select>
              </div>
            </section>
            <ProductCatalogueItemList
              items={items}
              onFavoriteProductSwitch={this.handleFavoriteProductSwitch}
            />
            {/* <!-- Список товаров каталога --> */}
            {/* <section className="product-catalogue__item-list">
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-1"
                    src="img/catalogue-pics/product-catalogue__item-1.png"
                    alt="Босоножки женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Босоножки женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Damlax</span>
                  </p>
                  <p className="item-price">18 520</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-2"
                    src="img/catalogue-pics/product-catalogue__item-2.png"
                    alt="Ботинки женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Ботинки женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Norma J.Baker</span>
                  </p>
                  <p className="item-price">23 150</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-3"
                    src="img/catalogue-pics/product-catalogue__item-3.png"
                    alt="Босоножки женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Босоножки женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Damlax</span>
                  </p>
                  <p className="item-price">5 390</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-4"
                    src="img/catalogue-pics/product-catalogue__item-4.png"
                    alt="Кроссовки женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Кроссовки женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Damlax</span>
                  </p>
                  <p className="item-price">6 520</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-5"
                    src="img/catalogue-pics/product-catalogue__item-5.png"
                    alt="Резиновые полусапоги женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Резиновые полусапоги женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Menghi Shoes</span>
                  </p>
                  <p className="item-price">10 030</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-6"
                    src="img/catalogue-pics/product-catalogue__item-6.png"
                    alt="Полусапоги женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Полусапоги женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Pegia</span>
                  </p>
                  <p className="item-price">10 140</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-7"
                    src="img/catalogue-pics/product-catalogue__item-7.png"
                    alt="Босоножки женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Босоножки женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Baldinini</span>
                  </p>
                  <p className="item-price">25 020</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-8"
                    src="img/catalogue-pics/product-catalogue__item-8.png"
                    alt="Туфли женские"
                  />
                  <div className="product-catalogue__product_favorite-chosen">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Туфли женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Baldini</span>
                  </p>
                  <p className="item-price">18 520</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-9"
                    src="img/catalogue-pics/product-catalogue__item-9.png"
                    alt="Полуботинки женские"
                  />
                  <div className="product-catalogue__product_favorite-chosen">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Полуботинки женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Norma J.Baker</span>
                  </p>
                  <p className="item-price">21 830</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-10"
                    src="img/catalogue-pics/product-catalogue__item-10.png"
                    alt="Туфли женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Туфли женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Norma J.Baker</span>
                  </p>
                  <p className="item-price">20 830</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-11"
                    src="img/catalogue-pics/product-catalogue__item-11.png"
                    alt="Ботинки женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Ботинки женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Norma J.Baker</span>
                  </p>
                  <p className="item-price">26 240</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-12"
                    src="img/catalogue-pics/product-catalogue__item-12.png"
                    alt="Туфли женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Туфли женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Vittorio Virgili</span>
                  </p>
                  <p className="item-price">17 750</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-13"
                    src="img/catalogue-pics/product-catalogue__item-13.png"
                    alt="Ботинки женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Ботинки женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Loriblu</span>
                  </p>
                  <p className="item-price">24 700</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-14"
                    src="img/catalogue-pics/product-catalogue__item-14.png"
                    alt="Босоножки женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Босоножки женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Damlax</span>
                  </p>
                  <p className="item-price">18 520</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic">
                  <img
                    className="item-pic-15"
                    src="img/catalogue-pics/product-catalogue__item-15.png"
                    alt="Балетки женские"
                  />
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Балетки женские</h4>
                  <p className="item-producer">
                    Производитель:
                    <span className="producer">Ballin</span>
                  </p>
                  <p className="item-price">20 730</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
            </section> */}
            {/* <!-- Пагинация под каталогом --> */}
            <div className="product-catalogue__pagination">
              <div className="page-nav-wrapper">
                <div className="angle-back"><a href="#"></a></div>
                <ul>
                  <li className="active"><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li><a href="">...</a></li>
                  <li><a href="#">99</a></li>
                </ul>
                <div className="angle-forward"><a href="#"></a></div>
              </div>
            </div>
          </section>
        </main>
        {/* <!-- Слайдер внизу каталога  --> */}
        <section className="product-catalogue__overlooked-slider">
          <h3>Вы смотрели:</h3>
          <div className="overlooked-slider">
            <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"></div>
            <div className="overlooked-slider__item overlooked-slider__item-1">
              <a href="product-card-desktop.html"></a>
            </div>
            <div className="overlooked-slider__item overlooked-slider__item-2">
              <a href="product-card-desktop.html"></a>
            </div>
            <div className="overlooked-slider__item overlooked-slider__item-3">
              <a href="product-card-desktop.html"></a>
            </div>
            <div className="overlooked-slider__item overlooked-slider__item-4">
              <a href="product-card-desktop.html"></a>
            </div>
            <div className="overlooked-slider__item overlooked-slider__item-5">
              <a href="product-card-desktop.html"></a>
            </div>
            <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"></div>
          </div>
        </section>
      </div>
    );
  }
}


const CataloguePageWithFilter = withData(
  '/filters',
  data => ({ filters: data }),
  false,
)(CataloguePage);


export default CataloguePageWithFilter;
