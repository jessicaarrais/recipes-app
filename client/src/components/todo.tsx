import React from 'react';
import gql from 'graphql-tag';
import DeleteTodoBtn from './deleteTodoBtn';
import TodoCheckbox from './todoCheckbox';
import TodoText from './todoText';

export const TODO_FRAGMENT = gql`
  fragment TodoFragment on Todo {
    __typename
    id
    sheetId
    text
    isChecked
  }
`;

interface TodoPropsType {
  id: number;
  sheetId: number;
  isChecked: boolean;
  text: string;
}

function Todo(props: TodoPropsType) {
  return (
    <li>
      <TodoCheckbox
        todoId={props.id}
        isChecked={props.isChecked}
        sheetId={props.sheetId}
      />
      <TodoText todoId={props.id} text={props.text} sheetId={props.sheetId} />
      <DeleteTodoBtn todoId={props.id} sheetId={props.sheetId} />
    </li>
  );
}

export default Todo;
