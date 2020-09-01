import React from 'react';
import { gql, useMutation } from '@apollo/client';
import EditableTextArea from '../editable-text-area/EditableTextArea';

const UPDATE_INSTRUCTION = gql`
  mutation UpdateInstruction(
    $instructionId: ID!
    $step: String
    $text: String
    $recipeId: ID!
  ) {
    updateInstruction(
      instructionId: $instructionId
      step: $step
      text: $text
      recipeId: $recipeId
    ) {
      instruction {
        id
        step
      }
    }
  }
`;

interface UpdateInstructionStepResponse {
  updateInstruction: {
    instruction?: { id: string; step: string };
  };
}

interface Props {
  instructionId: string;
  recipeId: string;
  step: string;
}

function InstructionStep(props: Props) {
  const [updateInstruction] = useMutation<UpdateInstructionStepResponse>(
    UPDATE_INSTRUCTION
  );

  const onSubmit = (step: string): void => {
    updateInstruction({
      variables: {
        instructionId: props.instructionId,
        step,
        recipeId: props.recipeId,
      },
    });
  };

  return (
    <EditableTextArea semanticalType="p" onSubmit={onSubmit}>
      {props.step}
    </EditableTextArea>
  );
}

export default InstructionStep;
