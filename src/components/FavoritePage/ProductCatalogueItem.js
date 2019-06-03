import React from 'react';
import { Link } from 'react-router-dom';

import ProductCatalogueItemSizes from './ProductCatalogueItemSizes.js';
import { formatPrice } from '../common/functions.js';


class ProductCatalogueItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      imageNum: (this.props.item.images && this.props.item.images.length) ? 0 : null,
    };
    this.onLeftArrowClick = this.onLeftArrowClick.bind(this);
    this.onRightArrowClick = this.onRightArrowClick.bind(this);
  }

  onLeftArrowClick(event) {
    event.preventDefault();
    const { imageNum } = this.state;
    if (imageNum > 0) {
      this.setState({ imageNum: imageNum - 1 });
    }
  }

  onRightArrowClick(event) {
    event.preventDefault();
    const imagesLength = this.state.item.images.length;
    const { imageNum } = this.state;
    if (imageNum < imagesLength - 1) {
      this.setState({ imageNum: imageNum + 1 });
    }
  }

  // componentWillReceiveProps(newProps) {}

  render() {
    const { item, imageNum } = this.state;
    const imagesLength = this.state.item.images.length;
    const imageSrc = item.images[imageNum];
    const styles = {
      backgroundImage: `url(${imageSrc})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
    const stylesInactive = {
      opacity: 0.35,
    };
    return (
      <Link to={`/product/${item.id}`} className="item-list__item-card item">
        <div className="item-pic" style={styles}>
          <div
            className="product-catalogue__product_favorite"
            onClick={e => this.props.onFavoriteProductSwitch(e, item.id)}
          ><p></p></div>
          <div
            onClick={this.onLeftArrowClick}
            className="arrow arrow_left"
            style={(imageNum > 0) ? null : stylesInactive}
          ></div>
          <div
            onClick={this.onRightArrowClick}
            className="arrow arrow_right"
            style={imageNum < imagesLength - 1 ? null : stylesInactive}
          ></div>
        </div>
        <div className="item-desc">
          <h4 className="item-name">{item.title}</h4>
          <p className="item-producer">
            Производитель: <span className="producer">{item.brand}</span>
          </p>
          <p className="item-price">
            {formatPrice(item.price, '')}
          </p>
          {(item.sizes && item.sizes.length)
            ? <ProductCatalogueItemSizes sizes={item.sizes} />
            : null}
        </div>
      </Link>
    );
  }
}

export default ProductCatalogueItem;
