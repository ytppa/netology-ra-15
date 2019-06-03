import React from 'react';

import { formatPrice } from '../common/functions.js';

const Price = ({ value }) => {
  const result = typeof value === 'number' ? value.toLocaleString() : '0';
  return (
    <div className="price">{formatPrice(result)}</div>
  );
};

export default Price;
