import React, { useState } from 'react';
import DeleteInstructionButton from './DeleteInstructionButton';
import InstructionStep from './InstructionStep';
import InstructionDescription from './InstructionDescription';
import styled from 'styled-components';

const S = {
  ListItem: styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 32px;
    margin: 8px 0 8px;
  `,
  ContentWrapper: styled.div`
    width: 100%;
  `,
};

export interface InstructionProps {
  id: string;
  recipeId: string;
  step: string;
  description: string;
  tip: string;
}

function Instruction(props: InstructionProps) {
  const [
    isShowingDeleteInstructionButton,
    setIsShowingDeleteInstructionButton,
  ] = useState(false);

  return (
    <S.ListItem
      onMouseOver={() => setIsShowingDeleteInstructionButton(true)}
      onMouseLeave={() => setIsShowingDeleteInstructionButton(false)}
    >
      <p>{props.tip}</p>
      <S.ContentWrapper>
        <InstructionStep
          instructionId={props.id}
          recipeId={props.recipeId}
          step={props.step}
        />
        <InstructionDescription
          instructionId={props.id}
          recipeId={props.recipeId}
          description={props.description}
        />
      </S.ContentWrapper>
      {isShowingDeleteInstructionButton && (
        <DeleteInstructionButton instructionId={props.id} recipeId={props.recipeId} />
      )}
    </S.ListItem>
  );
}

export default Instruction;
