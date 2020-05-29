import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_TODO = gql`
  mutation UpdateTodo($todoId: ID!, $text: String, $isChecked: Boolean, $sheetId: ID!) {
    updateTodo(todoId: $todoId, text: $text, isChecked: $isChecked, sheetId: $sheetId) {
      todo {
        id
        sheetId
        text
        isChecked
      }
    }
  }
`;

interface TodoTextboxProps {
  todoId: number;
  text: string;
  sheetId: number;
}

function TodoText(props: TodoTextboxProps) {
  const [updateTodo, { error }] = useMutation(UPDATE_TODO);
  const [newText, setNewText] = useState(props.text);
  const [isEditingText, setIsEditingText] = useState(false);

  const handleUpdateTodoText = (text: string): void => {
    setIsEditingText(false);
    if (text !== props.text) {
      updateTodo({
        variables: { todoId: props.todoId, text, sheetId: props.sheetId },
      });
    }
  };

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <div>
      {isEditingText ? (
        <input
          ref={(ref) => ref && ref.focus()}
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleUpdateTodoText(newText);
          }}
          onBlur={() => handleUpdateTodoText(newText)}
        />
      ) : (
        <p
          onClick={() => {
            setIsEditingText(true);
            setNewText(props.text);
          }}
        >
          {props.text}
        </p>
      )}
    </div>
  );
}

export default TodoText;
