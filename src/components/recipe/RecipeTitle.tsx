import React from 'react';
import { gql, useMutation } from '@apollo/client';
import EditableTextArea from '../editable-text-area/EditableTextArea';
import { GET_COOKBOOK, RecipesListOrder } from '../../pages/loggedin/LoggedInRoute';
import './recipe-title.css';

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($recipeId: ID!, $title: String, $cookbookId: ID!) {
    updateRecipe(recipeId: $recipeId, title: $title, cookbookId: $cookbookId) {
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
  cookbookId: string;
  title: string;
}

function RecipeTitle(props: Props) {
  const [updateRecipe, { error }] = useMutation<UpdateRecipeTitleResponse>(UPDATE_RECIPE);

  const onSubmit = (title: string) =>
    updateRecipe({
      variables: { recipeId: props.id, title, cookbookId: props.cookbookId },
      refetchQueries: [
        {
          query: GET_COOKBOOK,
          variables: { recipesListOrder: RecipesListOrder.TITLE_ASCENDING },
        },
      ],
    });

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <div className="recipe-title-container">
      <EditableTextArea semanticalType="h2" onSubmit={onSubmit}>
        {props.title}
      </EditableTextArea>
    </div>
  );
}

export default RecipeTitle;
