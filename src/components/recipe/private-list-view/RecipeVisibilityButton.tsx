import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { IconButton } from '@material-ui/core';
import Icon from '../../icon/Icon';

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
    <IconButton
      aria-label={props.isPublic ? 'Public' : 'Private'}
      color="default"
      size="small"
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
      <Icon icon={props.isPublic ? 'lock_open' : 'lock'} size="md-16" />
    </IconButton>
  );
}

export default RecipeVisibilityButton;
