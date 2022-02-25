import React from 'react';
import '../styles/button.css';

export const Button = ({
  icon,
  iconEnd = false,
  title,
  type = 'button',
  textColor = 'black',
  textSize = '1rem',
  textWeight = '400',
  onClick,
  withBorder = false,
}) => {
  return (
    <button
      className={withBorder ? 'button with-border' : 'button'}
      onClick={onClick}
      type={type}
      style={{
        color: textColor,
        fontSize: textSize,
        fontWeight: textWeight,
      }}
    >
      {icon}
      {title}
    </button>
  );
};
