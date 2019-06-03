// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Local Components
import { withData, formatPrice } from '../common/functions.js';
import Storage from '../common/Storage.js';

export default class NewDeals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      activeCategory: null,
    };
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.filterCategories = this.filterCategories.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { categories, products } = newProps;
    const newState = {};

    if (products) {
      newState.products = products;
    }

    if (categories) {
      newState.categories = categories;
      if (this.state.activeCategory === null) newState.activeCategory = newState.categories[0].id;
    }
    this.setState(newState);
  }

  filterCategories() {
    let { categories, activeCategory } = this.state;
    const { products } = this.state;

    if (categories.length && products.length) {
      // Скрываем категории, которые не представлеы в реестре продуктов
      categories = categories.filter(
        categorie => !!products.some(product => product.categoryId === categorie.id),
      );

      // Сбросим выделение на первый видимый элемент
      if (!categories.some(category => category.id === activeCategory)) {
        activeCategory = categories[0].id;
      }
    }

    return { categories, activeCategory };
  }

  handleMenuSelect(event) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-id');
    this.setState({ activeCategory: id });
  }

  render() {
    const { title } = this.props;
    const { categories, activeCategory } = this.filterCategories();
    const { products } = this.state;
    const filteredProducts = products.filter(product => product.categoryId === activeCategory);
    return (
      <section className="new-
        deals wave-bottom">

        <h2 className="h2">{title}</h2>
        <NewDealsMenu
          categories={categories}
          active={activeCategory}
          onSelect={this.handleMenuSelect}
        />
        <NewDealsSlider products={filteredProducts} />
      </section>
    );
  }
}


export const NewDealsWithCategories = withData('/featured', data => ({ products: data }), false)(
  withData('/categories', data => ({ categories: data }), false)(NewDeals),
);


class NewDealsSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: Storage.updateFavoriteProducts(this.props.products),
      active: 0,
    };
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);

    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleFavoriteSwitch = this.handleFavoriteSwitch.bind(this);
  }

  handleFavoriteSwitch(event) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-id');
    const { products } = this.state;
    const product = products.find(el => el.id === +id);

    if (product !== undefined && Storage.switchFavorite(product.id) !== null) {
      const newProducts = Storage.updateFavoriteProducts(this.state.products);
      this.setState({ products: newProducts });
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      products: Storage.updateFavoriteProducts(newProps.products),
      active: 0,
    });
  }

  prepareData() {
    const { products, active } = this.state;
    const productFirst = products[active - 1]
      ? products[active - 1]
      : products[products.length - 1];
    const productActive = products[active] ? products[active] : null;
    const productLast = products[active + 1] ? products[active + 1] : products[0];
    return { productFirst, productActive, productLast };
  }

  handleLeftArrowClick(event) {
    event.preventDefault();
    const newActive = this.state.active > 0
      ? this.state.active - 1
      : this.state.products.length - 1;
    this.setState({ active: newActive });
  }

  handleRightArrowClick(event) {
    event.preventDefault();
    const newActive = this.state.active < this.state.products.length - 1
      ? this.state.active + 1
      : 0;
    this.setState({ active: newActive });
  }

  render() {
    if (this.state.products === null || !this.state.products.length) return null;

    const { productFirst, productActive, productLast } = this.prepareData();
    const styles = { backgroundSize: 'contain' };

    return (
      <div>
        <div className="new-deals__slider">
          <div
            className="new-deals__arrow new-deals__arrow_left arrow"
            onClick={this.handleLeftArrowClick}
          ></div>
          <div
            className="new-deals__product new-deals__product_first"
            onClick={this.handleLeftArrowClick}
            style={{ backgroundImage: `url("${productFirst.images[0]}")`, ...styles }}
          >
            <a href="#"></a>
          </div>

          <div
            className="new-deals__product new-deals__product_active"
            style={{ backgroundImage: `url("${productActive.images[0]}")`, ...styles }}
          >
            <Link to={`/product/${productActive.id}`}></Link>
            <div
              className={`new-deals__product_favorite ${
                productActive.favorite ? 'new-deals__product_favorite_chosen' : null
              }`}
              data-id={productActive.id}
              onClick={this.handleFavoriteSwitch}
            ></div>
          </div>
          <div
            className="new-deals__product new-deals__product_last"
            onClick={this.handleRightArrowClick}
            style={{ backgroundImage: `url("${productLast.images[0]}")`, ...styles }}
          >
            <a href="#"></a>
          </div>
          <div
            className="new-deals__arrow new-deals__arrow_right arrow"
            onClick={this.handleRightArrowClick}
          ></div>
        </div>
        <div className="new-deals__product-info">
          <Link to={`/product/${productActive.id}`} className="h3">{productActive.title}</Link>
          <p>Производитель:
            <span>{productActive.brand}</span>
          </p>
          <h3 className="h3">{formatPrice(productActive.price)}</h3>
        </div>
      </div>
    );
  }
}

NewDealsSlider.propTypes = {
  products: PropTypes.array,
};


const NewDealsMenu = ({ categories, active, onSelect }) => {
  if (categories.length) {
    return (
      <div className="new-deals__menu">
        <ul className="new-deals__menu-items">
          { categories.map((category) => {
            const isActive = (category.id === active);
            return (
              <NewDealsMenuElement
                key={category.id}
                category={category}
                isActive={isActive}
                onSelect={onSelect}
              />
            );
          })
          }
        </ul>
      </div>

    );
  }

  return null;
};

NewDealsMenu.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  active: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSelect: PropTypes.func.isRequired,
};

const NewDealsMenuElement = ({ category, isActive, onSelect }) => (
    <li
      key={category.id}
      className={`new-deals__menu-item ${isActive ? 'new-deals__menu-item_active' : ''}`}
    >
      <Link
        to={`/catalogue/${category.id}`}
        data-id={category.id}
        onClick={onSelect}
      >
        {category.title}
      </Link>
    </li>
);
