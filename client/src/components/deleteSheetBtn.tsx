import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Button from './button';

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

interface DeleteSheetProps {
  sheetId: number;
  notebookId: number;
}

function DeleteSheet(props: DeleteSheetProps) {
  const [deleteSheet] = useMutation(DELETE_SHEET);

  return (
    <Button type="button" handleOnClick={() => deleteSheet({ variables: props })}>
      delete sheet
    </Button>
  );
}

export default DeleteSheet;
