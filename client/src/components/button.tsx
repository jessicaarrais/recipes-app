import React from 'react';

interface PropsType {
  type: 'submit' | 'button' | 'reset' | undefined;
  children?: string;
  handleOnClick?(param?: any): void;
}

function Button(props: PropsType) {
  return (
    <button type={props.type} onClick={props.handleOnClick}>
      {props.children}
    </button>
  );
}

export default Button;
