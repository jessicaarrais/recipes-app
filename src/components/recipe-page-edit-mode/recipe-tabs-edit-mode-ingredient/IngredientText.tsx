import React from 'react';
import { gql, useMutation } from '@apollo/client';
import EditableTextArea from '../EditableTextArea';

const UPDATE_INGREDIENT = gql`
  mutation UpdateIngredient(
    $ingredientId: ID!
    $text: String
    $isChecked: Boolean
    $recipeId: ID!
  ) {
    updateIngredient(
      ingredientId: $ingredientId
      text: $text
      isChecked: $isChecked
      recipeId: $recipeId
    ) {
      ingredient {
        id
        recipeId
        text
      }
    }
  }
`;

interface UpdateIngredientTextResponse {
  updateIngredient: {
    ingredient?: { id: string; recipeId: string; text: string };
  };
}

interface Props {
  ingredientId: string;
  text: string;
  recipeId: string;
}

function IngredientText(props: Props) {
  const [updateIngredient, { error }] = useMutation<UpdateIngredientTextResponse>(
    UPDATE_INGREDIENT
  );

  const onSubmit = (text: string): void => {
    updateIngredient({
      variables: { ingredientId: props.ingredientId, text, recipeId: props.recipeId },
    });
  };

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <EditableTextArea semanticalType="p" onSubmit={onSubmit}>
      {props.text}
    </EditableTextArea>
  );
}

export default IngredientText;
