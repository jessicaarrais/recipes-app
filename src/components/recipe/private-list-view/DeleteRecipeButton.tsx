import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import Icon from '../../icon/Icon';
import { GET_COOKBOOK } from '../../../pages/loggedin/HomeLoggedInPage';
import { RecipesListOrder } from '../../../pages/loggedin/HomeLoggedInPage';

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
      color="secondary"
      variant="contained"
      size="medium"
      fullWidth
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
      <Icon icon="delete" size="md-24" />
      delete
    </Button>
  );
}

export default DeleteRecipeButton;
