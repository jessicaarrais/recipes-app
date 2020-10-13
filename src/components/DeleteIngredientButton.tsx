import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import Icon from './icon/Icon';

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
    <Button
      color="secondary"
      variant="contained"
      size="medium"
      onClick={() => deleteIngredient({ variables: props })}
    >
      <Icon icon="clear" size="md-16" />
    </Button>
  );
}

export default DeleteIngredientButton;
