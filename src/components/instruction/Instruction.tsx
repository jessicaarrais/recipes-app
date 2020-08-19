import React, { useState } from 'react';
import DeleteInstructionButton from './DeleteInstructionButton';
import InstructionStep from './InstructionStep';
import InstructionText from './InstructionText';
import './instruction.css';

interface Props {
  id: number;
  recipeId: number;
  step: string;
  text: string;
}

function Instruction(props: Props) {
  const [
    isShowingDeleteInstructionButton,
    setIsShowingDeleteInstructionButton,
  ] = useState(false);

  return (
    <li
      className="instruction-list"
      onMouseOver={() => setIsShowingDeleteInstructionButton(true)}
      onMouseLeave={() => setIsShowingDeleteInstructionButton(false)}
    >
      <div className="instructions-container">
        <InstructionStep
          instructionId={props.id}
          recipeId={props.recipeId}
          step={props.step}
        />
        <InstructionText
          instructionId={props.id}
          recipeId={props.recipeId}
          text={props.text}
        />
      </div>
      {isShowingDeleteInstructionButton && (
        <div>
          <DeleteInstructionButton instructionId={props.id} recipeId={props.recipeId} />
        </div>
      )}
    </li>
  );
}

export default Instruction;
