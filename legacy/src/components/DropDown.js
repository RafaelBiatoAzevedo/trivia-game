import React from 'react';

export const DropDown = ({ items, value, name, onChange }) => {
  return (
    <select
      style={{ width: '35rem' }}
      className="input"
      value={value}
      name={name}
      onChange={onChange}
    >
      <option>All</option>
      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
