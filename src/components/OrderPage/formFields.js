import React from 'react';


export const FormField = ({ onChange, ...fields }) => {
  const { type, title, placeholder, name, value, required } = fields;
  return (
    <label className="order-process__delivery-label">
      <div className="order-process__delivery-text">{title}</div>
      <input
        className="order-process__delivery-input"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
};

export const FormRadioField = ({ name, required, checked, onChange, title, value }) => (
    <label className="order-process__paid-label" htmlFor={`${name}-${value}`}>
      <input
        className="order-process__paid-radio"
        id={`${name}-${value}`}
        type="radio"
        name={name}
        value={value}
        required={required}
        checked={checked}
        onChange={onChange}
      /><span className="order-process__paid-text">{title}</span>
    </label>
);
