import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { TODO_FRAGMENT } from './todo';

const CREATE_TODO = gql`
  mutation CreateTodo($text: String, $isChecked: Boolean, $sheetId: ID!) {
    createTodo(text: $text, isChecked: $isChecked, sheetId: $sheetId) {
      success
      message
      sheet {
        id
        title
        todos {
          ...TodoFragment
        }
      }
    }
  }
  ${TODO_FRAGMENT}
`;

interface CreateTodoBtnProps {
  text: string;
  isChecked: boolean;
  sheetId: number;
}

function CreateTodoBtn(props: CreateTodoBtnProps) {
  const [createTodo] = useMutation(CREATE_TODO);

  return (
    <button type="button" onClick={() => createTodo({ variables: props })}>
      new todo
    </button>
  );
}

export default CreateTodoBtn;
