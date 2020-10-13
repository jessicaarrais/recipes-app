import React, { MouseEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon } from '@material-ui/core';

const LIKE_RECIPE = gql`
  mutation LikeRecipe($recipeId: ID!) {
    likeRecipe(recipeId: $recipeId) {
      success
      recipe {
        id
        isLiked
        likes
      }
    }
  }
`;

const UNLIKE_RECIPE = gql`
  mutation UnlikeRecipe($recipeId: ID!) {
    unlikeRecipe(recipeId: $recipeId) {
      success
      recipe {
        id
        isLiked
        likes
      }
    }
  }
`;

interface Props {
  recipeId: string;
  isLiked: boolean;
}

function LikeButton(props: Props) {
  const [likeRecipe] = useMutation(LIKE_RECIPE);
  const [unlikeRecipe] = useMutation(UNLIKE_RECIPE);

  const handleMutation = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (props.isLiked) {
      unlikeRecipe({ variables: { recipeId: props.recipeId } });
    } else {
      likeRecipe({ variables: { recipeId: props.recipeId } });
    }
  };

  return (
    <Button
      color="default"
      size="medium"
      fullWidth
      startIcon={props.isLiked ? <Icon>favorite</Icon> : <Icon>favorite_border</Icon>}
      onClick={handleMutation}
    >
      Like
    </Button>
  );
}

export default LikeButton;
