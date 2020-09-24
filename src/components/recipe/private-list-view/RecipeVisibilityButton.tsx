import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../../styled-button/Button';
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
    <div title={props.isPublic ? 'Public' : 'Private'}>
      <Button
        type="button"
        actionType="secondary"
        handleOnClick={(event) => {
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
      </Button>
    </div>
  );
}

export default RecipeVisibilityButton;
