import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import Icon from './icon/Icon';

const CREATE_INSTRUCTION = gql`
  mutation CreateInstruction(
    $step: String!
    $description: String!
    $tip: String!
    $recipeId: ID!
  ) {
    createInstruction(
      step: $step
      description: $description
      tip: $tip
      recipeId: $recipeId
    ) {
      recipe {
        id
        instructions {
          id
        }
      }
    }
  }
`;

interface CreateInstructionResponse {
  createInstruction: {
    recipe?: {
      id: string;
      instruction: [{ id: string }];
    };
  };
}

interface Props {
  recipeId: string;
}

function CreateInstructionButton(props: Props) {
  const [createInstruction] = useMutation<CreateInstructionResponse>(CREATE_INSTRUCTION);

  return (
    <Button
      color="primary"
      variant="contained"
      size="medium"
      onClick={() =>
        createInstruction({
          variables: {
            recipeId: props.recipeId,
            step: 'Step: ',
            description: 'Description',
            tip: 'Tip here',
          },
        })
      }
    >
      <Icon icon="add" size="md-24" />
      add instruction
    </Button>
  );
}

export default CreateInstructionButton;
