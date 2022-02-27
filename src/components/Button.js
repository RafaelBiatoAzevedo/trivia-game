import React from 'react';
import '../styles/button.css';

export const Button = ({
  icon,
  value,
  title = '',
  type = 'button',
  textColor = 'black',
  textSize = '1rem',
  textWeight = '400',
  onClick,
  withBorder = false,
  disabled = false,
  padding = '0.2rem 1rem',
  style,
  isBtnAnswer = false,
}) => {
  return isBtnAnswer ? (
    <button
      value={value}
      disabled={disabled}
      className={withBorder ? 'button with-border' : 'button'}
      onClick={onClick}
      type={type}
      style={{
        color: textColor,
        fontSize: textSize,
        fontWeight: textWeight,
        padding: padding,
        ...style,
      }}
    >
      {title}
    </button>
  ) : (
    <button
      value={value}
      disabled={disabled}
      className={withBorder ? 'button with-border' : 'button'}
      onClick={onClick}
      type={type}
      style={{
        color: textColor,
        fontSize: textSize,
        fontWeight: textWeight,
        padding: padding,
        ...style,
      }}
    >
      {icon}
      {title}
    </button>
  );
};
