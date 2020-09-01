import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../styled-button/Button';
import Icon from '../Icon';
import { RECIPE_FRAGMENT, RecipeProps } from '../recipe/Recipe';
import { RecipesListOrder } from '../../pages/loggedin/LoggedInRoute';

const CREATE_RECIPE = gql`
  mutation CreateRecipe(
    $title: String
    $cookbookId: ID!
    $recipesListOrder: RecipesListOrder
  ) {
    createRecipe(title: $title, cookbookId: $cookbookId) {
      cookbook {
        id
        recipes(order: $recipesListOrder) {
          ...RecipeFragment
        }
      }
    }
  }
  ${RECIPE_FRAGMENT}
`;

interface CreateRecipeReponse {
  createRecipe: { cookbook: { id: number; recipes: [RecipeProps] } };
}

interface Props {
  cookbookId: number;
  order: RecipesListOrder;
}

function CreateRecipeButton(props: Props) {
  const [createRecipe, { error }] = useMutation<CreateRecipeReponse>(CREATE_RECIPE);

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <Button
      type="button"
      actionType="primary"
      handleOnClick={() => {
        createRecipe({
          variables: {
            title: 'Title',
            cookbookId: props.cookbookId,
            recipesListOrder: props.order,
          },
        });
      }}
    >
      <Icon icon="create" />
      New Recipe
    </Button>
  );
}

export default CreateRecipeButton;
