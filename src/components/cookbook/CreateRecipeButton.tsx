import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../styled-button/Button';
import Icon from '../Icon';
import { RECIPE_FRAGMENT } from '../recipe/Recipe';

const CREATE_RECIPE = gql`
  mutation CreateRecipe($title: String, $cookbookId: ID!) {
    createRecipe(title: $title, cookbookId: $cookbookId) {
      cookbook {
        id
        recipes {
          ...RecipeFragment
        }
      }
    }
  }
  ${RECIPE_FRAGMENT}
`;

interface Props {
  cookbookId: number;
}

function CreateRecipeButton(props: Props) {
  const [createRecipe, { error }] = useMutation(CREATE_RECIPE);

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <Button
      type="button"
      actionType="primary"
      handleOnClick={() =>
        createRecipe({
          variables: { title: 'Title', cookbookId: props.cookbookId },
        })
      }
    >
      <Icon icon="create" />
      New Recipe
    </Button>
  );
}

export default CreateRecipeButton;
