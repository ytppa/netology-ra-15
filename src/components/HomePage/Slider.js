import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import { slider } from '../common/functions.js';


export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      slides: this.props.slides,
    };
  }

  componentDidMount() {
    const f = document.querySelector('.slider__pictures');
    const a = f.getElementsByClassName('slider__image');
    const button = f
      .getElementsByClassName('slider__circles')[0]
      .getElementsByClassName('slider__circle');
    const arrows = f.getElementsByClassName('slider__arrow');
    slider(f, a, button, '4000', '1000', arrows);
  }

  render() {
    const { title, slides } = this.state;
    return (
      <section className="slider">
        <div className="wrapper">
          <div className="slider__pictures">
            {slides.map((slide, i) => <SliderItem key={i} {...slide} />)}
            <div className="arrow slider__arrow slider__arrow_left"></div>
            <div className="arrow slider__arrow slider__arrow_right"></div>
            <div className="slider__circles">
              {slides.map(
                (slide, i) => <button key={i} className="slider__circle" value={i}></button>,
              )}
            </div>
            <h2 className="h2">{title}</h2>
          </div>
        </div>
      </section>
    );
  }
}

Slider.propTypes = {
  title: PropTypes.string,
  slides: PropTypes.arrayOf(PropTypes.object),
};

export const SliderItem = (props) => {
  const { href, src, alt } = props;
  return (
    <Link to={href} className="slider__image">
      <img src={src} alt={alt} />
    </Link>
  );
};

SliderItem.propTypes = {
  href: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

SliderItem.defaultProps = {
  href: '#',
  alt: 'slide picture',
};
