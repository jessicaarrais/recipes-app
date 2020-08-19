import React, { ButtonHTMLAttributes } from 'react';
import './button.css';

interface Props {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  children?: ButtonHTMLAttributes<HTMLButtonElement>['children'];
  actionType: 'default' | 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  handleOnClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

function Button(props: Props) {
  return (
    <button
      type={props.type}
      className={`base ${props.actionType}`}
      disabled={props.disabled}
      onClick={props.handleOnClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
