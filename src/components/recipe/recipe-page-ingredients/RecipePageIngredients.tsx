import React from 'react';
import styled from 'styled-components';

const Ingredient = styled.li`
  padding: 16px 0;
`;

interface Props {
  ingredients: [{ id: string; text: string; instructionId: string }];
}

function RecipePageIngredients(props: Props) {
  return (
    <ul>
      {props.ingredients.map((ingredient) => (
        <Ingredient key={ingredient.id}>
          <input type="checkbox" />
          {ingredient.text}
        </Ingredient>
      ))}
    </ul>
  );
}

export default RecipePageIngredients;
