import React from 'react';
import './button.css';
import { Link } from 'react-router-dom';


const MyButton = (props) => {
  return (
    <Link to={props.path}>
      <button className='btn'>{props.name}</button>
    </Link>
  );
}

export { MyButton };