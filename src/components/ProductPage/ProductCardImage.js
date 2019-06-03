import React from 'react';

const ProductCardImage = ({ image, alt }) => (
    <div className="main-screen__favourite-product-pic">
      <a href="#"><img src={ image } alt={ alt } /></a>
      <a href="#" className="main-screen__favourite-product-pic__zoom"></a>
    </div>
);

export default ProductCardImage;
