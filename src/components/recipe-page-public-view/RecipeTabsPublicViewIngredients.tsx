import React from 'react';
import styled from 'styled-components';

const S = {
  IngredientsList: styled.ul`
    padding: 0;
  `,
  ListItem: styled.li`
    display: flex;
    align-items: center;
    padding: 12px 0;
  `,

  Text: styled.p`
    margin: 0 4px;
  `,
};

interface Props {
  ingredients: [{ id: string; text: string }];
}

function RecipeTabsPublicViewIngredients(props: Props) {
  return (
    <S.IngredientsList>
      {props.ingredients.map((ingredient) => (
        <S.ListItem key={ingredient.id}>
          <input type="checkbox" />
          <S.Text>{ingredient.text}</S.Text>
        </S.ListItem>
      ))}
    </S.IngredientsList>
  );
}

export default RecipeTabsPublicViewIngredients;
