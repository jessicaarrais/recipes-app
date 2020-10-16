import React from 'react';
import { gql, useMutation } from '@apollo/client';
import EditableTextArea from '../EditableTextArea';

const UPDATE_INSTRUCTION = gql`
  mutation UpdateInstruction($instructionId: ID!, $description: String, $recipeId: ID!) {
    updateInstruction(
      instructionId: $instructionId
      description: $description
      recipeId: $recipeId
    ) {
      instruction {
        id
        description
      }
    }
  }
`;

interface UpdateInstructionDescriptionResponse {
  updateInstruction: {
    instruction?: { id: string; description: string };
  };
}

interface Props {
  instructionId: string;
  recipeId: string;
  description: string;
}

function InstructionDescription(props: Props) {
  const [updateInstruction] = useMutation<UpdateInstructionDescriptionResponse>(
    UPDATE_INSTRUCTION
  );

  const onSubmit = (description: string) => {
    updateInstruction({
      variables: {
        instructionId: props.instructionId,
        description,
        recipeId: props.recipeId,
      },
    });
  };

  return (
    <EditableTextArea semanticalType="p" onSubmit={onSubmit}>
      {props.description}
    </EditableTextArea>
  );
}

export default InstructionDescription;
