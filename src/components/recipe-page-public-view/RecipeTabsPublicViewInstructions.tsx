import React from 'react';
import { Icon } from '@material-ui/core';
import { IngredientProps } from '../recipe-page-edit-mode/recipe-tabs-edit-mode-ingredient/Ingredient';
import { InstructionProps } from '../recipe-page-edit-mode/recipe-tabs-edit-mode-instruction/Instruction';
import styled from 'styled-components';

const S = {
  InstructionsList: styled.ul`
    padding: 0;
  `,

  StepWrapper: styled.div`
    display: inline-flex;
    align-items: center;
  `,

  IngredientsList: styled.ul`
    display: flex;
    padding: 8px 0;
  `,

  IngredientItem: styled.li`
    margin: 2px;
    padding: 8px;
    border: 1px solid lightskyblue;
    border-radius: 8px;
  `,

  hr: styled.hr`
    color: floralwhite;
    margin: 20px 0;
  `,
};

interface Props {
  ingredients: [IngredientProps];
  instructions: [InstructionProps];
}

function RecipeTabsPublicViewInstructions(props: Props) {
  return (
    <S.InstructionsList>
      {props.instructions.map((instruction) => (
        <li key={instruction.id}>
          <S.StepWrapper>
            <p>{instruction.step}</p>
            <Icon title={`Tip: ${instruction.tip}`}>info</Icon>
          </S.StepWrapper>
          <p>{instruction.description}</p>
          <S.IngredientsList>
            {props.ingredients
              .filter((ingredient) => ingredient.instructionId === instruction.id)
              .map((ingredient) => (
                <S.IngredientItem key={ingredient.id}>{ingredient.text}</S.IngredientItem>
              ))}
          </S.IngredientsList>
          <S.hr />
        </li>
      ))}
    </S.InstructionsList>
  );
}

export default RecipeTabsPublicViewInstructions;
