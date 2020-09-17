import React, { MouseEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../styled-button/Button';
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

const UNLIKE = gql`
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
  const [unlikeRecipe] = useMutation(UNLIKE);

  const handleMutation = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (props.isLiked) {
      unlikeRecipe({ variables: { recipeId: props.recipeId } });
    } else {
      likeRecipe({ variables: { recipeId: props.recipeId } });
    }
  };

  return (
    <Button type="button" actionType="secondary" handleOnClick={handleMutation}>
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
