import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../styled-button/Button';
import Icon from '../Icon';

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
    recipe?: { id: number; ingredients: [{ id: number }] };
  };
}

interface Props {
  ingredientId: number;
  recipeId: number;
}

function DeleteIngredientButton(props: Props) {
  const [deleteIngredient, { error }] = useMutation<DeleteIngredientResponse>(
    DELETE_INGREDIENT
  );

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <Button
      type="button"
      actionType="danger"
      handleOnClick={() => deleteIngredient({ variables: props })}
    >
      <Icon icon="clear" />
    </Button>
  );
}

export default DeleteIngredientButton;
