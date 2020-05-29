import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Button from './button';
import { SHEET_FRAGMENT } from './sheet';

const CREATE_SHEET = gql`
  mutation CreateSheet($title: String, $notebookId: ID!) {
    createSheet(title: $title, notebookId: $notebookId) {
      notebook {
        id
        sheets {
          ...SheetFragment
        }
      }
    }
  }
  ${SHEET_FRAGMENT}
`;

interface CreateSheetProps {
  notebookId: number;
}

function CreateSheetBtn(props: CreateSheetProps) {
  const [createSheet, { error }] = useMutation(CREATE_SHEET);

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <Button
      type="button"
      handleOnClick={() =>
        createSheet({
          variables: { title: 'Title', notebookId: props.notebookId },
        })
      }
    >
      New Sheet
    </Button>
  );
}

export default CreateSheetBtn;
