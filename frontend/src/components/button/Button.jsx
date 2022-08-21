import React from 'react';
import './button.css';
import { Link } from 'react-router-dom';


const BigButton = (props) => {
  return (
    <Link to={props.path}>
      <button className='ut_btn'>{props.name}</button>
    </Link>
  );
}

const SmallButton = (props) => {
  return (
    <Link to={props.path}>
      <button className='kt_btn'>{props.name}</button>
    </Link>
  );
}

export { BigButton, SmallButton };