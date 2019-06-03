import React from 'react';

const Separator = ({ size, id }) => (
    <div
      className={`separator-${size}${(id !== undefined)
        ? ` separator-${size}-${id}`
        : null}`}
    ></div>
);

export default Separator;
