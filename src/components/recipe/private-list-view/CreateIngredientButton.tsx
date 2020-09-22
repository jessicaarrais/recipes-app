import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../../styled-button/Button';
import Icon from '../../icon/Icon';
import { INGREDIENT_FRAGMENT, IngredientProps } from '../../ingredient/Ingredient';

const CREATE_INGREDIENT = gql`
  mutation CreateIngredient($text: String!, $isChecked: Boolean!, $recipeId: ID!) {
    createIngredient(text: $text, isChecked: $isChecked, recipeId: $recipeId) {
      recipe {
        id
        title
        ingredients {
          ...IngredientFragment
        }
      }
    }
  }
  ${INGREDIENT_FRAGMENT}
`;

interface CreateIngredientResponse {
  createIngredient: {
    recipe?: {
      id: string;
      title: string;
      ingredients: [IngredientProps];
    };
  };
}

interface Props {
  recipeId: string;
}

function CreateIngredientButton(props: Props) {
  const [createIngredient] = useMutation<CreateIngredientResponse>(CREATE_INGREDIENT);

  return (
    <Button
      type="button"
      actionType="primary"
      handleOnClick={() =>
        createIngredient({
          variables: {
            recipeId: props.recipeId,
            text: 'New Ingredient',
            isChecked: false,
          },
        })
      }
    >
      <Icon icon="add" size="md-24" />
      add ingredient
    </Button>
  );
}

export default CreateIngredientButton;
