import React from 'react';
import gql from 'graphql-tag';
import Todo, { TODO_FRAGMENT } from './todo';
import CreateTodoBtn from './createTodoBtn';
import DeleteSheet from './deleteSheetBtn';
import SheetTitle from './sheetTitle';

export const SHEET_FRAGMENT = gql`
  fragment SheetFragment on Sheet {
    __typename
    id
    notebookId
    title
    todos {
      ...TodoFragment
    }
  }
  ${TODO_FRAGMENT}
`;

interface SheetPropsType {
  id: number;
  notebookId: number;
  title: string;
  todos: [];
}

function Sheet(props: SheetPropsType) {
  return (
    <li>
      <SheetTitle id={props.id} notebookId={props.notebookId} title={props.title} />
      <ul>
        {props.todos.map((todo: any) => (
          <Todo
            key={todo.id}
            id={todo.id}
            sheetId={todo.sheetId}
            isChecked={todo.isChecked}
            text={todo.text}
          />
        ))}
      </ul>
      <CreateTodoBtn text="todo" isChecked={false} sheetId={props.id} />
      <DeleteSheet sheetId={props.id} notebookId={props.notebookId} />
    </li>
  );
}

export default Sheet;
