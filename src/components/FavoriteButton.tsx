import React, { MouseEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from './styled-button/Button';
import Icon from './Icon';

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
      console.log('added');
    } else {
      removeRecipeFromFavorites({ variables: { recipeId: props.recipeId } });
      console.log('removed');
    }
  };

  return (
    <Button type="button" actionType="secondary" handleOnClick={handleMutation}>
      {props.isFavorite ? <Icon icon="star" /> : <Icon icon="star_border" />}
    </Button>
  );
}

export default FavoriteRecipeButton;
