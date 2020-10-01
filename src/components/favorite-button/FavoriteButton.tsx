import React, { MouseEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import Icon from '../icon/Icon';

const ADD_TO_FAVORITES = gql`
  mutation AddRecipeToFavorites($recipeId: ID!) {
    addRecipeToFavorites(recipeId: $recipeId) {
      success
      recipe {
        id
        isFavorite
      }
    }
  }
`;

const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveRecipeFromFavorites($recipeId: ID!) {
    removeRecipeFromFavorites(recipeId: $recipeId) {
      success
      recipe {
        id
        isFavorite
      }
    }
  }
`;

interface Props {
  recipeId: string;
  isFavorite: boolean;
}

function FavoriteRecipeButton(props: Props) {
  const [addRecipeToFavorites] = useMutation(ADD_TO_FAVORITES);
  const [removeRecipeFromFavorites] = useMutation(REMOVE_FROM_FAVORITES);

  const handleMutation = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (!props.isFavorite) {
      addRecipeToFavorites({ variables: { recipeId: props.recipeId } });
    } else {
      removeRecipeFromFavorites({ variables: { recipeId: props.recipeId } });
    }
  };

  return (
    <Button color="default" size="medium" onClick={handleMutation}>
      {props.isFavorite ? (
        <Icon icon="star" size="md-24" />
      ) : (
        <Icon icon="star_border" size="md-24" />
      )}
      Favorite
    </Button>
  );
}

export default FavoriteRecipeButton;
