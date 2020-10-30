import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon } from '@material-ui/core';

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($recipeId: ID!, $isPublic: Boolean) {
    updateRecipe(recipeId: $recipeId, isPublic: $isPublic) {
      recipe {
        id
        isPublic
      }
    }
  }
`;

interface UpdateRecipeIsPublicResponse {
  updateRecipe: {
    recipe?: {
      id: string;
      isPublic: boolean;
    };
  };
}

interface Props {
  recipeId: string;
  isPublic: boolean;
}
function RecipeVisibilityButton(props: Props) {
  const [updateRecipe, { error }] = useMutation<UpdateRecipeIsPublicResponse>(
    UPDATE_RECIPE
  );

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <Button
      color="default"
      size="medium"
      startIcon={<Icon>{props.isPublic ? 'lock_open' : 'lock'}</Icon>}
      onClick={(event) => {
        event.preventDefault();
        updateRecipe({
          variables: {
            recipeId: props.recipeId,
            isPublic: !props.isPublic,
          },
        });
      }}
    >
      {props.isPublic ? 'Public' : 'Private'}
    </Button>
  );
}

export default RecipeVisibilityButton;
