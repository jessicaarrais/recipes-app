import React from 'react';
import { gql, useMutation } from '@apollo/client';
import EditableTextArea from './EditableTextArea';
import { GET_COOKBOOK, RecipesListOrder } from '../../pages/HomeLoggedInPage';

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($recipeId: ID!, $title: String) {
    updateRecipe(recipeId: $recipeId, title: $title) {
      recipe {
        id
        title
      }
    }
  }
`;

interface UpdateRecipeTitleResponse {
  updateRecipe: {
    recipe?: {
      id: string;
      title: string;
    };
  };
}

interface Props {
  id: string;
  title: string;
}

function RecipeTitleEditMode(props: Props) {
  const [updateRecipe, { error }] = useMutation<UpdateRecipeTitleResponse>(UPDATE_RECIPE);

  const onSubmit = (title: string) =>
    updateRecipe({
      variables: { recipeId: props.id, title },
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

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <EditableTextArea semanticalType="h2" onSubmit={onSubmit}>
      {props.title}
    </EditableTextArea>
  );
}

export default RecipeTitleEditMode;
