import React, { ButtonHTMLAttributes } from 'react';

interface PropsType {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  children?: ButtonHTMLAttributes<HTMLButtonElement>['children'];
  handleOnClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

function Button(props: PropsType) {
  return (
    <button type={props.type} onClick={props.handleOnClick}>
      {props.children}
    </button>
  );
}

export default Button;
