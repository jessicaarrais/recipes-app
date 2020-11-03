import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon } from '@material-ui/core';
import { GET_COOKBOOK, RecipesListOrder } from '../pages/HomeLoggedInPage';

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
  const history = useHistory();

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
        history.push('/home');
      }}
    >
      delete
    </Button>
  );
}

export default DeleteRecipeButton;
