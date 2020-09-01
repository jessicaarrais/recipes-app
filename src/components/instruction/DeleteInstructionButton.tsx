import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../styled-button/Button';
import Icon from '../Icon';

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
      type="button"
      actionType="danger"
      handleOnClick={() => deleteInstruction({ variables: props })}
    >
      <Icon icon="clear" />
    </Button>
  );
}

export default DeleteInstructionButton;
