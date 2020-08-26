import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../styled-button/Button';
import Icon from '../Icon';

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($recipeId: ID!, $isPublic: Boolean, $cookbookId: ID!) {
    updateRecipe(recipeId: $recipeId, isPublic: $isPublic, cookbookId: $cookbookId) {
      recipe {
        id
        isPublic
      }
    }
  }
`;

interface Props {
  recipeId: number;
  isPublic: boolean;
  cookbookId: number;
}
function RecipeVisibility(props: Props) {
  const [updateRecipe, { error }] = useMutation(UPDATE_RECIPE);

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <div title={props.isPublic ? 'Public' : 'Private'}>
      <Button
        type="button"
        actionType="secondary"
        handleOnClick={() => {
          updateRecipe({
            variables: {
              recipeId: props.recipeId,
              isPublic: !props.isPublic,
              cookbookId: props.cookbookId,
            },
          });
        }}
      >
        <Icon icon={props.isPublic ? 'lock_open' : 'lock'} />
      </Button>
    </div>
  );
}

export default RecipeVisibility;
