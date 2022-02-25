import React from 'react';
import '../styles/input.css';

export const Input = ({
  type,
  name,
  value,
  onChange,
  placeHolder = '',
  textColor = '#000',
  textSize = '1rem',
  width = '15rem',
  autoFocus = false,
}) => {
  return (
    <input
      className="input"
      autoFocus={autoFocus}
      style={{ width: width, fontSize: textSize, color: textColor }}
      type={type}
      name={name}
      value={value}
      placeholder={placeHolder}
      onChange={onChange}
    ></input>
  );
};
