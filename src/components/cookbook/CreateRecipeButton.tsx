import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../styled-button/Button';
import Icon from '../Icon';
import { GET_COOKBOOK } from '../../pages/loggedin/HomeLoggedInPage';
import { RecipesListOrder } from '../../pages/loggedin/HomeLoggedInPage';

const CREATE_RECIPE = gql`
  mutation CreateRecipe($title: String, $cookbookId: ID!) {
    createRecipe(title: $title, cookbookId: $cookbookId) {
      success
    }
  }
`;

interface CreateRecipeReponse {
  createRecipe: { success: boolean };
}

interface Props {
  cookbookId: string;
}

function CreateRecipeButton(props: Props) {
  const [createRecipe, { error }] = useMutation<CreateRecipeReponse>(CREATE_RECIPE);

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <Button
      type="button"
      actionType="primary"
      handleOnClick={() => {
        createRecipe({
          variables: {
            title: 'Title',
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
        });
      }}
    >
      <Icon icon="create" />
      New Recipe
    </Button>
  );
}

export default CreateRecipeButton;
