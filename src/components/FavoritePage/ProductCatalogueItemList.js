import React from 'react';

import ProductCatalogueItem from './ProductCatalogueItem.js';


export default class ProductCatalogueItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
    };
  }

  componentWillReceiveProps({ items }) {
    if (items) {
      this.setState({ items });
    }
  }

  render() {
    const { items } = this.state;
    return (
      <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
        {items.map(
          item => (
            <ProductCatalogueItem
              key={item.id}
              onFavoriteProductSwitch={this.props.onFavoriteProductSwitch}
              item={item}
            />
          ),
        )}
      </section>
    );
  }
}
