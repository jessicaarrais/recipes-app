import React from 'react';
import Todo from './todo';

interface SheetPropsType {
  title: string;
  todos: [];
}

function Sheet(props: SheetPropsType) {
  return (
    <li>
      <h3>{props.title}</h3>
      <ul>
        {props.todos.map((todo: any) => (
          <Todo key={todo.id} isChecked={todo.isChecked} text={todo.text} />
        ))}
      </ul>
    </li>
  );
}
export default Sheet;
