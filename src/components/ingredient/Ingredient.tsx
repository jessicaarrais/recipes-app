import React, { useState } from 'react';
import { gql } from '@apollo/client';
import DeleteIngredientButton from './DeleteIngredientButton';
import IngredientCheckbox from './IngredientCheckbox';
import IngredientText from './IngredientText';
import './ingredient.css';

export const INGREDIENT_FRAGMENT = gql`
  fragment IngredientFragment on Ingredient {
    __typename
    id
    recipeId
    text
    isChecked
  }
`;

export interface IngredientProps {
  id: number;
  recipeId: number;
  isChecked: boolean;
  text: string;
}

function Ingredient(props: IngredientProps) {
  const [isShowingDeleteIngredientButton, setIsShowingDeleteIngredientButton] = useState(
    false
  );

  return (
    <li
      className="ingredient-list"
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
        <div>
          <DeleteIngredientButton ingredientId={props.id} recipeId={props.recipeId} />
        </div>
      )}
    </li>
  );
}

export default Ingredient;
