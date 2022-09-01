import React from 'react';
import './button.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


const BigButton = (props) => {
  return (
    <Button 
      className='ut_btn' 
      onClick={props.onClick}
    >
      {props.name}
    </Button>
  );
}

const SmallButton = (props) => {
  return (
    <Link to={props.path}>
      <button className='kt_btn'>{props.name}</button>
    </Link>
  );
}

const CommonButton = ({ children, color, disabled, size, sx, variant, onClick }) => {
  return (
      <Button
          color={color}
          disabled={disabled}
          size={size}
          sx={sx}
          variant={variant}
          onClick={onClick}
      >
          {children}
      </Button>
  )
}

export { BigButton, SmallButton, CommonButton };