import React, { MouseEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import Icon from '../icon/Icon';

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
    <Button color="default" size="medium" onClick={handleMutation}>
      {props.isLiked ? (
        <Icon icon="favorite" size="md-24" />
      ) : (
        <Icon icon="favorite_border" size="md-24" />
      )}
      Like
    </Button>
  );
}

export default LikeButton;
