import React, { ButtonHTMLAttributes, CSSProperties } from 'react';
import '../assets/css/button.css';

interface Props {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  children?: ButtonHTMLAttributes<HTMLButtonElement>['children'];
  styleType: 'primary' | 'danger' | 'default';
  icon?: 'menu' | 'create' | 'add' | 'delete' | 'clear' | 'delete_forever';
  handleOnClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

function Button(props: Props) {
  return (
    <>
      <button
        type={props.type}
        className={`base ${props.styleType}`}
        onClick={props.handleOnClick}
      >
        <span className="material-icons">{props.icon}</span>
        {props.children}
      </button>
    </>
  );
}

export default Button;
