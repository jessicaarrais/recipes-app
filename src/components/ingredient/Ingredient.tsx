import React, { useState } from 'react';
import { gql } from '@apollo/client';
import DeleteIngredientButton from './DeleteIngredientButton';
import IngredientCheckbox from './IngredientCheckbox';
import IngredientText from './IngredientText';
import styled from 'styled-components';

const S = {
  ListItem: styled.li`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 32px;
    margin: 8px 0 8px;
  `,
};

export const INGREDIENT_FRAGMENT = gql`
  fragment IngredientFragment on Ingredient {
    __typename
    id
    recipeId
    instructionId
    text
    isChecked
  }
`;

export interface IngredientProps {
  id: string;
  recipeId: string;
  isChecked: boolean;
  text: string;
  instructionId?: string;
}

function Ingredient(props: IngredientProps) {
  const [isShowingDeleteIngredientButton, setIsShowingDeleteIngredientButton] = useState(
    false
  );

  return (
    <S.ListItem
      onMouseOver={() => setIsShowingDeleteIngredientButton(true)}
      onMouseLeave={() => setIsShowingDeleteIngredientButton(false)}
    >
      <IngredientCheckbox
        ingredientId={props.id}
        isChecked={props.isChecked}
        recipeId={props.recipeId}
      />
      <IngredientText
        ingredientId={props.id}
        text={props.text}
        recipeId={props.recipeId}
      />
      {isShowingDeleteIngredientButton && (
        <DeleteIngredientButton ingredientId={props.id} recipeId={props.recipeId} />
      )}
    </S.ListItem>
  );
}

export default Ingredient;
