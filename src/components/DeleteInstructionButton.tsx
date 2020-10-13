import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon } from '@material-ui/core';

const DELETE_INSTRUCTION = gql`
  mutation DeleteInstruction($instructionId: ID!, $recipeId: ID!) {
    deleteInstruction(instructionId: $instructionId, recipeId: $recipeId) {
      recipe {
        id
        instructions {
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
    <Button
      color="secondary"
      variant="contained"
      size="medium"
      onClick={() => deleteInstruction({ variables: props })}
    >
      <Icon>clear</Icon>
    </Button>
  );
}

export default DeleteInstructionButton;
