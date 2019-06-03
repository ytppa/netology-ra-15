import React from 'react';


class ProductCardSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images ? this.props.images : [],
      visible: this.props.visible,
      position: 0,
    };
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { images, visible } = newProps;
    const newState = { images, visible, position: 0 };
    this.setState(newState);
  }

  handleUpClick(event) {
    event.preventDefault();
    if (this.state.images.length <= this.state.visible || this.state.position === 0) return null;

    const newPosition = (this.state.position > 0) ? (this.state.position - 1) : 0;

    this.setState({ position: newPosition });
    return true;
  }

  handleDownClick(event) {
    event.preventDefault();
    if (this.state.images.length <= this.state.visible
      || this.state.position === (this.state.images.length - 1 - this.state.visible)) return null;
    const newPosition = (this.state.position < (this.state.images.length - 1 - this.state.visible))
      ? (this.state.position + 1)
      : (this.state.position < (this.state.images.length - 1 - this.state.visible));

    this.setState({ position: newPosition });
    return true;
  }

  render() {
    const { images, position, visible } = this.state;
    const { onSelect } = this.props;

    if (images.length <= 1) return null;

    const visibleImages = images
      .slice(position, position + visible)
      .map((value, index) => ({ key: index, url: value }));
    return (
      <section className="main-screen__favourite-product-slider">
        <div className="favourite-product-slider">
          {
            (images.length > visible)
              ? (<div
                  className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"
                  onClick={this.handleUpClick}></div>)
              : null
          }
          {
            visibleImages.map((image, index) => {
              const styles = {
                backgroundImage: `url("${image.url}")`,
                backgroundSize: 'contain',
              };
              return (
                <div
                  key={image.key}
                  className={
                    `favourite-product-slider__item favourite-product-slider__item-${index + 1}`
                  }
                  style={styles}
                >
                  <a href={image.url} data-id={image.key} onClick={onSelect}></a>
                </div>
              );
            })
          }
          {
            (images.length > visible)
              ? (<div
                  className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"
                  onClick={this.handleDownClick}></div>)
              : null
          }

        </div>
      </section>
    );
  }
}

export default ProductCardSlider;
