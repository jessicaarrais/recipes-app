import React from 'react';
import Icon from '../../icon/Icon';
import styled from 'styled-components';

const S = {
  ListItem: styled.li`
    padding: 16px 0;
  `,

  StepWrapper: styled.div`
    display: inline-flex;
    align-items: center;
  `,

  IngredientsList: styled.ul`
    display: flex;
  `,

  IngredientItem: styled.li`
    margin: 2px;
    padding: 8px;
    border: 1px solid lightskyblue;
    border-radius: 8px;
  `,
};

interface Props {
  ingredients: [{ id: string; text: string; instructionId: string }];
  instructions: [{ id: string; step: string; description: string; tip: string }];
}

function RecipePageInstructions(props: Props) {
  return (
    <ul>
      {props.instructions.map((instruction) => (
        <S.ListItem key={instruction.id}>
          <S.StepWrapper>
            <p>{instruction.step}</p>
            <Icon icon="info" size="md-16" title={`Tip: ${instruction.tip}`} />
          </S.StepWrapper>
          <p>{instruction.description}</p>
          <S.IngredientsList>
            {props.ingredients
              .filter((ingredient) => ingredient.instructionId === instruction.id)
              .map((ingredient) => (
                <S.IngredientItem key={ingredient.id}>{ingredient.text}</S.IngredientItem>
              ))}
          </S.IngredientsList>
          <hr />
        </S.ListItem>
      ))}
    </ul>
  );
}

export default RecipePageInstructions;
