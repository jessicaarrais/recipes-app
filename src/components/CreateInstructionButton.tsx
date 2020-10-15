import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon } from '@material-ui/core';

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
      fullWidth
      startIcon={<Icon>add</Icon>}
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
      add instruction
    </Button>
  );
}

export default CreateInstructionButton;
