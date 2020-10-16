import React from 'react';
import { gql, useMutation } from '@apollo/client';

const UPDATE_INGREDIENT = gql`
  mutation UpdateIngredient(
    $ingredientId: ID!
    $text: String
    $isChecked: Boolean
    $recipeId: ID!
  ) {
    updateIngredient(
      ingredientId: $ingredientId
      text: $text
      isChecked: $isChecked
      recipeId: $recipeId
    ) {
      ingredient {
        id
        recipeId
        isChecked
      }
    }
  }
`;

interface UpdateIngredientCheckboxResponse {
  updateIngredient?: {
    ingredient: {
      id: string;
      recipeId: string;
      ishecked: boolean;
    };
  };
}

interface Props {
  ingredientId: string;
  isChecked: boolean;
  recipeId: string;
}

function IngredientCheckbox(props: Props) {
  const [updateIngredient, { error }] = useMutation<UpdateIngredientCheckboxResponse>(
    UPDATE_INGREDIENT
  );

  const handleUpdateIngredientCheckbox = (isChecked: boolean): void => {
    if (isChecked !== props.isChecked) {
      updateIngredient({
        variables: {
          ingredientId: props.ingredientId,
          isChecked,
          recipeId: props.recipeId,
        },
      });
    }
  };

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <input
      type="checkbox"
      checked={props.isChecked}
      onChange={(e) => {
        handleUpdateIngredientCheckbox(e.target.checked);
      }}
    />
  );
}

export default IngredientCheckbox;
