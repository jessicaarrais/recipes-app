import React from 'react';
import { gql } from '@apollo/client';
import CreateIngredientButton from './CreateIngredientButton';
import CreateInstructionButton from './CreateInstructionButton';
import DeleteRecipeButton from './DeleteRecipeButton';
import Ingredient, { INGREDIENT_FRAGMENT } from '../ingredient/Ingredient';
import Instruction from '../instruction/Instruction';
import RecipeTitle from './RecipeTitle';
import RecipeVisibility from './RecipeVisibility';
import './recipe.css';

export const RECIPE_FRAGMENT = gql`
  fragment RecipeFragment on Recipe {
    __typename
    id
    cookbookId
    title
    isPublic
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

interface Props {
  id: number;
  cookbookId: number;
  title: string;
  isPublic: boolean;
  ingredients: [];
  instructions?: [];
}

function Recipe(props: Props) {
  return (
    <li className="recipe-li">
      <div className="recipe-header">
        <RecipeTitle id={props.id} cookbookId={props.cookbookId} title={props.title} />
        <RecipeVisibility
          recipeId={props.id}
          isPublic={props.isPublic}
          cookbookId={props.cookbookId}
        />
      </div>
      <ul>
        {props.ingredients.map((ingredient: any) => (
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
          {props.instructions.map((instruction: any) => (
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

export default Recipe;
