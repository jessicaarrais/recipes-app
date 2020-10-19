import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon } from '@material-ui/core';
import { GET_COOKBOOK } from '../pages/HomeLoggedInPage';
import { RecipesListOrder } from '../pages/HomeLoggedInPage';
import urlParser from '../utils/urlParser';

const CREATE_RECIPE = gql`
  mutation CreateRecipe($title: String!, $description: String!) {
    createRecipe(title: $title, description: $description) {
      success
      recipe {
        id
        cookbookId
        title
      }
    }
  }
`;

interface CreateRecipeReponse {
  createRecipe: {
    success: boolean;
    recipe: {
      id: string;
      cookbookId: string;
      title: string;
    };
  };
}

interface Props {
  title: string;
  isDisabled: boolean;
}

function CreateRecipeButton(props: Props) {
  const history = useHistory();

  const [createRecipe, { error }] = useMutation<CreateRecipeReponse>(CREATE_RECIPE, {
    onCompleted(data) {
      const urlTitle = urlParser(data.createRecipe.recipe.title);
      history.push(
        `/${'editing'}/cookbook/${
          data.createRecipe.recipe.cookbookId
        }/recipe/${urlTitle}/${data.createRecipe.recipe.id}`
      );
    },
  });

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <Button
      color="primary"
      variant="contained"
      size="medium"
      fullWidth
      startIcon={<Icon>create</Icon>}
      disabled={props.isDisabled}
      onClick={() => {
        createRecipe({
          variables: { title: props.title, description: 'Recipe description' },
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
      Start
    </Button>
  );
}

export default CreateRecipeButton;
