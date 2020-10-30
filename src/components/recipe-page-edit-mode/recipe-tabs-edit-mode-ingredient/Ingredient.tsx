import React from 'react';
import { gql } from '@apollo/client';
import DeleteIngredientButton from '../../DeleteIngredientButton';
import IngredientCheckbox from './IngredientCheckbox';
import IngredientText from './IngredientText';
import styled from 'styled-components';

const S = {
  ListItem: styled.li`
    display: flex;
    align-items: center;
    margin: 2px;
    padding: 8px;
    border: 1px solid lightskyblue;
    border-radius: 8px;
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

interface Props {
  ingredient: IngredientProps;
}

function Ingredient(props: Props) {
  return (
    <S.ListItem>
      <IngredientCheckbox
        ingredientId={props.ingredient.id}
        isChecked={props.ingredient.isChecked}
        recipeId={props.ingredient.recipeId}
      />
      <IngredientText
        ingredientId={props.ingredient.id}
        text={props.ingredient.text}
        recipeId={props.ingredient.recipeId}
      />
      <DeleteIngredientButton
        ingredientId={props.ingredient.id}
        recipeId={props.ingredient.recipeId}
      />
    </S.ListItem>
  );
}

export default Ingredient;
