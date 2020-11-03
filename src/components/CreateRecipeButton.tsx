import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon } from '@material-ui/core';
import { GET_COOKBOOK } from '../pages/HomeLoggedInPage';
import { RecipesListOrder } from '../pages/HomeLoggedInPage';

const CREATE_RECIPE = gql`
  mutation CreateRecipe($title: String!, $description: String!) {
    createRecipe(title: $title, description: $description) {
      success
    }
  }
`;

interface CreateRecipeReponse {
  createRecipe: { success: boolean };
}

function CreateRecipeButton() {
  const [createRecipe, { error }] = useMutation<CreateRecipeReponse>(CREATE_RECIPE);

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <Button
      color="primary"
      variant="contained"
      size="medium"
      fullWidth
      startIcon={<Icon>add</Icon>}
      onClick={() => {
        createRecipe({
          variables: { title: 'Title', description: 'Recipe description' },
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
      New Recipe
    </Button>
  );
}

export default CreateRecipeButton;
