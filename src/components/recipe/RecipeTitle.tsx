import React from 'react';
import { gql, useMutation } from '@apollo/client';
import EditableTextArea from '../editable-text-area/EditableTextArea';
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
      id: number;
      title: string;
    };
  };
}

interface Props {
  id: number;
  cookbookId: number;
  title: string;
}

function RecipeTitle(props: Props) {
  const [updateRecipe, { error }] = useMutation<UpdateRecipeTitleResponse>(UPDATE_RECIPE);

  const onSubmit = (title: string) =>
    updateRecipe({
      variables: { recipeId: props.id, title, cookbookId: props.cookbookId },
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
