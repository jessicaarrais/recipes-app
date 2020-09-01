import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../styled-button/Button';
import Icon from '../Icon';

const CREATE_INSTRUCTION = gql`
  mutation CreateInstruction($step: String, $text: String, $recipeId: ID!) {
    createInstruction(step: $step, text: $text, recipeId: $recipeId) {
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
      type="button"
      actionType="primary"
      handleOnClick={() =>
        createInstruction({
          variables: { recipeId: props.recipeId, step: 'Step: ', text: 'Instruction' },
        })
      }
    >
      <Icon icon="add" />
      add instruction
    </Button>
  );
}

export default CreateInstructionButton;
