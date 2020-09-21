import React, { useState } from 'react';
import DeleteInstructionButton from './DeleteInstructionButton';
import InstructionStep from './InstructionStep';
import InstructionDescription from './InstructionDescription';
import './instruction.css';

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
    <li
      className="instruction-list"
      onMouseOver={() => setIsShowingDeleteInstructionButton(true)}
      onMouseLeave={() => setIsShowingDeleteInstructionButton(false)}
    >
      <p>{props.tip}</p>
      <div className="instructions-container">
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
