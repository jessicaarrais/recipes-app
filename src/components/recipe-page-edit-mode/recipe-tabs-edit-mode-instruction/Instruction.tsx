import React from 'react';
import { Icon } from '@material-ui/core';
import CreateIngredientButton from '../../CreateIngredientButton';
import DeleteInstructionButton from '../../DeleteInstructionButton';
import Ingredient, {
  IngredientProps,
} from '../recipe-tabs-edit-mode-ingredient/Ingredient';
import InstructionStep from './InstructionStep';
import InstructionDescription from './InstructionDescription';
import styled from 'styled-components';

const S = {
  ListItem: styled.div`
    display: flex;
    align-items: baseline;
  `,

  ListItemBodyWrapper: styled.div`
    flex: 1;
    margin-right: 8px;
  `,

  InstructionTip: styled.div`
    padding: 12px;
  `,

  IngredientsList: styled.ul`
    display: flex;
    flex-wrap: wrap;
  `,

  hr: styled.hr`
    color: floralwhite;
    margin: 20px 0;
  `,
};

export interface InstructionProps {
  id: string;
  recipeId: string;
  step: string;
  description: string;
  tip: string;
}

interface Props {
  instruction: InstructionProps;
  ingredients: [IngredientProps];
}

function Instruction(props: Props) {
  return (
    <>
      <S.ListItem id={props.instruction.id}>
        <S.ListItemBodyWrapper>
          <InstructionStep
            instructionId={props.instruction.id}
            recipeId={props.instruction.recipeId}
            step={props.instruction.step}
          />
          <S.InstructionTip>
            <Icon title={`Tip: ${props.instruction.tip}`}>info</Icon>
            <span>{props.instruction.tip}</span>
          </S.InstructionTip>
          <InstructionDescription
            instructionId={props.instruction.id}
            recipeId={props.instruction.recipeId}
            description={props.instruction.description}
          />
          <S.IngredientsList>
            {props.ingredients
              .filter((ingredient) => ingredient.instructionId === props.instruction.id)
              .map((ingredient) => (
                <Ingredient key={ingredient.id} ingredient={ingredient} />
              ))}
          </S.IngredientsList>
          <CreateIngredientButton
            recipeId={props.instruction.recipeId}
            instructionId={props.instruction.id}
          />
        </S.ListItemBodyWrapper>
        <DeleteInstructionButton
          instructionId={props.instruction.id}
          recipeId={props.instruction.recipeId}
        />
      </S.ListItem>
      <S.hr />
    </>
  );
}

export default Instruction;
