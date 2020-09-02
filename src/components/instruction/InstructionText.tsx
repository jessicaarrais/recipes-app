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
        text
      }
    }
  }
`;

interface UpdateInstructionTextResponse {
  updateInstruction: {
    instruction?: { id: string; text: string };
  };
}

interface Props {
  instructionId: string;
  recipeId: string;
  text: string;
}

function InstructionText(props: Props) {
  const [updateInstruction] = useMutation<UpdateInstructionTextResponse>(
    UPDATE_INSTRUCTION
  );

  const onSubmit = (text: string) => {
    updateInstruction({
      variables: {
        instructionId: props.instructionId,
        text,
        recipeId: props.recipeId,
      },
    });
  };

  return (
    <EditableTextArea semanticalType="p" onSubmit={onSubmit}>
      {props.text}
    </EditableTextArea>
  );
}

export default InstructionText;
