import React from 'react';


import Storage from '../common/Storage.js';
import ProductCardSlider from './ProductCardSlider.js';
import ProductCardImage from './ProductCardImage.js';
import ProductCardProductInfo from './ProductCardProductInfo.js';
import { withData } from '../common/functions.js';


class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: this.props.id,
      product: null,
      selectedImage: null,
      selectedSize: null,
      quantity: 1,
      showTip: false,
    };

    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
    this.handleThumbSelect = this.handleThumbSelect.bind(this);
    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQuantityDecrease = this.handleQuantityDecrease.bind(this);
    this.handleQuantityIncrease = this.handleQuantityIncrease.bind(this);
  }

  componentWillReceiveProps(newProps) {
    let newState = {};
    const { product } = newProps;

    if (typeof product === 'object') {
      newState = {
        product,
        quantity: 1,
        selectedImage: 0,
        selectedSize: null,
      };

      this.setState(newState);
    }
  }

  handleAddToCartClick(event) {
    event.preventDefault();
    const { id } = this.state.product;
    const size = this.state.selectedSize;
    const { quantity } = this.state;

    if (size == null) {
      this.setState({ showTip: true });
      return null;
    }

    if (typeof this.props.addToCart === 'function') this.props.addToCart(id, size, quantity);
    return true;
  }

  handleThumbSelect(event) {
    event.preventDefault();
    const elemId = event.currentTarget.getAttribute('data-id');
    this.setState({ selectedImage: elemId });
  }

  handleSizeSelect(event) {
    event.preventDefault();
    const elemId = event.currentTarget.innerHTML;
    if (elemId !== this.state.selectedSize) {
      this.setState({
        selectedSize: elemId,
        showTip: false,
      });
    }
  }

  handleQuantityDecrease(event) {
    const { quantity } = this.state;
    if (quantity === 1) return null;
    this.setState({ quantity: (quantity > 1) ? (quantity - 1) : 1 });
    event.preventDefault();
    return true;
  }

  handleQuantityIncrease(event) {
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
    event.preventDefault();
  }

  render() {
    const { product, selectedImage, selectedSize, quantity, showTip } = this.state;
    if (!product) return null;

    const { title, images } = product;
    const image = images[selectedImage];
    return (
      <main className="product-card">
        {/* Тело карточки товара */}
        <section className="product-card-content">
          <h2 className="section-name">{title}</h2>
          <section className="product-card-content__main-screen">
            {/* Слайдер выбранного товара */}
            <ProductCardSlider images={images} onSelect={this.handleThumbSelect} visible={3} />
            {/* Изображение выбранного товара */}
            <ProductCardImage image={image} alt={title} />
            {/* Блок информации о товаре */}
            <ProductCardProductInfo
              product={product}
              addToCart={this.handleAddToCartClick}
              selectedSize={selectedSize}
              onSizeSelect={this.handleSizeSelect}
              quantity={quantity}
              onQuantityIncrease={this.handleQuantityIncrease}
              onQuantityDecrease={this.handleQuantityDecrease}
              showTip={showTip}
            />
          </section>
        </section>
      </main>
    );
  }
}

const ProductCardWithData = withData(
  ({ id }) => `/products/${id}`,
  (data) => {
    if (data && data.id) Storage.addToOverlooked(data.id);
    return ({ product: data });
  },
  true,
)(ProductCard);

export default ProductCardWithData;
