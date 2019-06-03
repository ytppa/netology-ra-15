import React from 'react';

import ProductCatalogueItemList from './ProductCatalogueItemList.js';
import ProductCatalogueSortBy from './ProductCatalogueSortBy.js';
import ProductCataloguePagination from './ProductCataloguePagination.js';

import '../../css/style-catalogue.css';
import '../../css/style-favorite.css';


import Storage from '../common/Storage.js';
import { SitePath, showLoader, hideLoader, declOfNum } from '../common/functions.js';

const Constants = require('../common/constants.js');

const { apiUrl } = Constants;


class FavoritePage extends React.Component {
  constructor(props) {
    super(props);
    const page = this.props.match.params.page !== undefined
      ? this.props.match.params.page
      : 1;


    this.state = {
      title: 'Избранное',
      sortBy: Storage.getString('favorite-sortBy', 'price'),
      items: [],
      total: 0,
      pages: 0,
      page,
    };
    this.handleFavoriteProductSwitch = this.handleFavoriteProductSwitch.bind(this);
    this.handleSortBySelect = this.handleSortBySelect.bind(this);
  }

  // Формирование url для запроса данных
  productsEndpoint(newState, favorites) {
    let { page, sortBy } = this.state;
    // favorites = Storage.getFavorites();
    let result = '/products/';
    const params = [];

    if (newState !== undefined && newState.page) ({ page } = newState);

    if (newState !== undefined && newState.sortBy) ({ sortBy } = newState);

    for (let i = 0; i < favorites.length; i += 1) {
      params.push({ key: `id[${i}]`, value: favorites[i] });
    }
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
    const favorites = Storage.getFavorites();
    const state = newState;
    if (!favorites.length) return null;
    const endpoint = this.productsEndpoint(state, favorites);

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
    const { items, total, pages, title, sortBy, page } = this.state;
    document.title = this.state.title;

    // http://api-neto.herokuapp.com/bosa-noga/products?id[0]=36&id[1]=21&id[2]=60&id[3]=63&sortBy=popularity
    return (
      <div className="wrapper wrapper_favorite">
        <SitePath title={title} url={this.props.match.url} />
        <main className="product-catalogue product-catalogue_favorite">
          <section className="product-catalogue__head product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">
                В вашем избранном{ (total > 0) ? null : ' пока ничего нет' }
              </h2>
                {(total > 0)
                  ? <span className="amount amount_favorite"> {
                        `${total} ${declOfNum(total, ['товар', 'товара', 'товаров'])}`
                      }</span>
                  : null}
            </div>
            <ProductCatalogueSortBy value={sortBy} onSortBySelect={this.handleSortBySelect} />
          </section>
          <ProductCatalogueItemList
            items={items}
            onFavoriteProductSwitch={this.handleFavoriteProductSwitch}
          />
          <ProductCataloguePagination page={page} pages={pages} />

        </main>
      </div>
    );
  }
}

export default FavoritePage;
