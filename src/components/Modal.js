import React from 'react';
import { Button } from './Button';
import '../styles/modal.css';

export const Modal = ({ text, handleclickCancel, handleClickConfirm }) => {
  return (
    <div className="container-overflow">
      <div className="container-modal">
        <h2>{text}</h2>
        <div>
          <Button
            title="Cancel"
            textSize="1.4rem"
            padding="0.5rem 2rem"
            textWeight="900"
            style={{ backgroundColor: '#ca4042', color: 'white' }}
            onClick={handleclickCancel}
          />
          <Button
            title="Confirm"
            textSize="1.4rem"
            padding="0.5rem 2rem"
            textWeight="900"
            style={{ backgroundColor: '#49a356', color: 'white' }}
            onClick={handleClickConfirm}
          />
        </div>
      </div>
    </div>
  );
};
