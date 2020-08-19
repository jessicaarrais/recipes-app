import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '../styled-button/Button';
import Icon from '../Icon';
import { INGREDIENT_FRAGMENT } from '../ingredient/Ingredient';

const CREATE_INGREDIENT = gql`
  mutation CreateIngredient($text: String, $isChecked: Boolean, $recipeId: ID!) {
    createIngredient(text: $text, isChecked: $isChecked, recipeId: $recipeId) {
      success
      message
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

interface Props {
  recipeId: number;
}

function CreateIngredientButton(props: Props) {
  const [createIngredient] = useMutation(CREATE_INGREDIENT);

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
      <Icon icon="add" />
      add ingredient
    </Button>
  );
}

export default CreateIngredientButton;