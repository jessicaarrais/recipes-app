import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { IconButton, Icon } from '@material-ui/core';

const DELETE_INSTRUCTION = gql`
  mutation DeleteInstruction($instructionId: ID!, $recipeId: ID!) {
    deleteInstruction(instructionId: $instructionId, recipeId: $recipeId) {
      success
      recipe {
        id
        instructions {
          id
        }
        ingredients {
          id
        }
      }
    }
  }
`;

interface DeleteInstructionResponse {
  deleteInstruction: {
    recipe?: {
      id: string;
      instructions: [{ id: string }];
    };
  };
}

interface Props {
  instructionId: string;
  recipeId: string;
}

function DeleteInstructionButton(props: Props) {
  const [deleteInstruction, { error }] = useMutation<DeleteInstructionResponse>(
    DELETE_INSTRUCTION
  );

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <IconButton
      aria-label="delete instruction"
      color="default"
      onClick={() => deleteInstruction({ variables: props })}
    >
      <Icon>delete</Icon>
    </IconButton>
  );
}

export default DeleteInstructionButton;
