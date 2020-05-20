import React from 'react';

interface TodoPropsType {
  isChecked: boolean;
  text: string;
}

function Todo(props: TodoPropsType) {
  return (
    <li>
      <input type="checkbox" checked={props.isChecked} />
      <p>{props.text}</p>
    </li>
  );
}

export default Todo;
