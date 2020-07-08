import React from 'react';
import gql from 'graphql-tag';
import EditableTextArea from './EditableTextArea';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_INSTRUCTION = gql`
  mutation UpdateInstruction(
    $instructionId: ID!
    $step: Int
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

interface Props {
  instructionId: number;
  recipeId: number;
  step: number;
}

function InstructionStep(props: Props) {
  const [updateInstruction] = useMutation(UPDATE_INSTRUCTION);

  const onSubmit = (step: string) => {
    const stepToInt = parseInt(step, 10);
    updateInstruction({
      variables: {
        instructionId: props.instructionId,
        step: stepToInt,
        recipeId: props.recipeId,
      },
    });
  };

  return (
    <EditableTextArea semanticalType="p" onSubmit={onSubmit}>
      {props.step.toString()}
    </EditableTextArea>
  );
}

export default InstructionStep;
