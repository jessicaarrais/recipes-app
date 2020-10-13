import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon } from '@material-ui/core';
import { GET_COOKBOOK, RecipesListOrder } from '../pages/loggedin/HomeLoggedInPage';

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($recipeId: ID!) {
    deleteRecipe(recipeId: $recipeId) {
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
      color="default"
      size="medium"
      fullWidth
      startIcon={<Icon>delete</Icon>}
      onClick={(event) => {
        event.preventDefault();
        deleteRecipe({
          variables: {
            recipeId: props.recipeId,
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
        });
      }}
    >
      delete
    </Button>
  );
}

export default DeleteRecipeButton;
