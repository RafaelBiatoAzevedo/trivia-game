import React from 'react';

import '../styles/toast.css';
import { TiDelete } from 'react-icons/ti';
import { IoMdWarning } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs';

const TYPES_TOAST = {
  error: {
    icon: <TiDelete color="white" size="3.5rem" />,
    color: '#ca4042',
  },
  warning: {
    icon: <IoMdWarning color="white" size="3rem" />,
    color: '#ff9800',
  },
  sucess: {
    icon: <FaCheckCircle color="white" size="3rem" />,
    color: '#49a356',
  },
  info: {
    icon: <BsFillInfoCircleFill color="white" size="3rem" />,
    color: '#3babc4',
  },
};

export const Toast = ({ title, type, description = '' }) => {
  return (
    <div
      className="container-toast"
      style={{ backgroundColor: TYPES_TOAST[type].color }}
    >
      {TYPES_TOAST[type].icon}
      <div>
        <h2 style={{ color: 'white' }}>{title}</h2>
        <h3 style={{ color: 'white' }}>{description}</h3>
      </div>
    </div>
  );
};
