import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Button from './Button';

const DELETE_SHEET = gql`
  mutation DeleteSheet($sheetId: ID!, $notebookId: ID!) {
    deleteSheet(sheetId: $sheetId, notebookId: $notebookId) {
      notebook {
        id
        sheets {
          id
        }
      }
    }
  }
`;

interface Props {
  sheetId: number;
  notebookId: number;
}

function DeleteSheetButton(props: Props) {
  const [deleteSheet] = useMutation(DELETE_SHEET);

  return (
    <Button
      type="button"
      handleOnClick={() => deleteSheet({ variables: props })}
      styleType="danger"
      icon="delete"
    >
      delete sheet
    </Button>
  );
}

export default DeleteSheetButton;
