import React from 'react';
import { gql } from '@apollo/client';
import CreateIngredientButton from './CreateIngredientButton';
import CreateInstructionButton from './CreateInstructionButton';
import DeleteRecipeButton from './DeleteRecipeButton';
import Ingredient, {
  INGREDIENT_FRAGMENT,
  IngredientProps,
} from '../../ingredient/Ingredient';
import Instruction, { InstructionProps } from '../../instruction/Instruction';
import { RecipesListOrder } from '../../../pages/loggedin/HomeLoggedInPage';
import RecipeTitle from './RecipeTitle';
import RecipeVisibilityButton from './RecipeVisibilityButton';
import './private-recipe-card.css';

export const RECIPE_FRAGMENT = gql`
  fragment RecipeFragment on Recipe {
    __typename
    id
    owner {
      id
    }
    cookbookId
    title
    isPublic
    likes
    isFavorite
    isLiked
    ingredients {
      ...IngredientFragment
    }
    instructions {
      id
      recipeId
      step
      text
    }
  }
  ${INGREDIENT_FRAGMENT}
`;

export interface RecipeProps {
  id: string;
  cookbookId: string;
  title: string;
  isPublic: boolean;
  ingredients: [IngredientProps];
  instructions?: [InstructionProps];
  order: RecipesListOrder;
}

function PrivateRecipeCard(props: RecipeProps) {
  return (
    <li className="recipe-li" id={props.id}>
      <div className="recipe-header">
        <RecipeTitle id={props.id} cookbookId={props.cookbookId} title={props.title} />
        <RecipeVisibilityButton
          recipeId={props.id}
          isPublic={props.isPublic}
          cookbookId={props.cookbookId}
        />
      </div>
      <ul>
        {props.ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            id={ingredient.id}
            recipeId={ingredient.recipeId}
            isChecked={ingredient.isChecked}
            text={ingredient.text}
          />
        ))}
      </ul>
      {props.instructions && (
        <ul>
          {props.instructions.map((instruction) => (
            <Instruction
              key={instruction.id}
              id={instruction.id}
              recipeId={instruction.recipeId}
              step={instruction.step}
              text={instruction.text}
            />
          ))}
        </ul>
      )}
      <div className="recipe-btns-container">
        <div className="create-ingredient-container">
          <CreateIngredientButton recipeId={props.id} />
        </div>
        <div className="create-instruction-container">
          <CreateInstructionButton recipeId={props.id} />
        </div>
        <div className="delete-recipe-container">
          <DeleteRecipeButton recipeId={props.id} cookbookId={props.cookbookId} />
        </div>
      </div>
    </li>
  );
}

export default PrivateRecipeCard;
