import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { IconButton, Icon } from '@material-ui/core';

const DELETE_INGREDIENT = gql`
  mutation DeleteIngredient($ingredientId: ID!, $recipeId: ID!) {
    deleteIngredient(ingredientId: $ingredientId, recipeId: $recipeId) {
      recipe {
        id
        ingredients {
          id
        }
      }
    }
  }
`;

interface DeleteIngredientResponse {
  deleteIngredient: {
    recipe?: { id: string; ingredients: [{ id: string }] };
  };
}

interface Props {
  ingredientId: string;
  recipeId: string;
}

function DeleteIngredientButton(props: Props) {
  const [deleteIngredient, { error }] = useMutation<DeleteIngredientResponse>(
    DELETE_INGREDIENT
  );

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <IconButton
      aria-label="delete ingredient"
      color="default"
      onClick={() => deleteIngredient({ variables: props })}
    >
      <Icon>delete</Icon>
    </IconButton>
  );
}

export default DeleteIngredientButton;
