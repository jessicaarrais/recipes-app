import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../styled-button/Button';
import Icon from '../Icon';
import { GET_COOKBOOK } from '../../pages/loggedin/HomeLoggedInPage';
import { RecipesListOrder } from '../../pages/loggedin/HomeLoggedInPage';

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($recipeId: ID!, $cookbookId: ID!) {
    deleteRecipe(recipeId: $recipeId, cookbookId: $cookbookId) {
      success
    }
  }
`;

interface DeleteRecipeResponse {
  deleteRecipe: { success: boolean };
}

interface Props {
  recipeId: string;
  cookbookId: string;
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
          },
          refetchQueries: [
            {
              query: GET_COOKBOOK,
              variables: { recipesListOrder: RecipesListOrder.DEFAULT },
            },
            {
              query: GET_COOKBOOK,
              variables: { recipesListOrder: RecipesListOrder.TITLE_ASCENDING },
            },
          ],
        })
      }
    >
      <Icon icon="delete" />
      delete recipe
    </Button>
  );
}

export default DeleteRecipeButton;
