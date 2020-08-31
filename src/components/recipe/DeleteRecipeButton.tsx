import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../styled-button/Button';
import Icon from '../Icon';
import { RecipesListOrder } from '../../pages/loggedin/LoggedInRoute';

const DELETE_RECIPE = gql`
  mutation DeleteRecipe(
    $recipeId: ID!
    $cookbookId: ID!
    $recipesListOrder: RecipesListOrder
  ) {
    deleteRecipe(recipeId: $recipeId, cookbookId: $cookbookId) {
      cookbook {
        id
        recipes(order: $recipesListOrder) {
          id
        }
      }
    }
  }
`;

interface DeleteRecipeResponse {
  deleteRecipe: {
    cookbook?: { id: number; recipes: [{ id: number }] };
  };
}

interface Props {
  recipeId: number;
  cookbookId: number;
  order: RecipesListOrder;
}

function DeleteRecipeButton(props: Props) {
  const [deleteRecipe] = useMutation<DeleteRecipeResponse>(DELETE_RECIPE);

  return (
    <Button
      type="button"
      actionType="danger"
      handleOnClick={() =>
        deleteRecipe({
          variables: {
            recipeId: props.recipeId,
            cookbookId: props.cookbookId,
            recipesListOrder: props.order,
          },
        })
      }
    >
      <Icon icon="delete" />
      delete recipe
    </Button>
  );
}

export default DeleteRecipeButton;
