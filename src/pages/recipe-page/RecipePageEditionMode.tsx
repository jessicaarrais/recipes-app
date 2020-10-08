import React from 'react';
import { useParams } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import CreateIngredientButton from '../../components/recipe/CreateIngredientButton';
import CreateInstructionButton from '../../components/recipe/CreateInstructionButton';
import DeleteRecipeButton from '../../components/recipe/DeleteRecipeButton';
import Ingredient, { IngredientProps } from '../../components/ingredient/Ingredient';
import Instruction, { InstructionProps } from '../../components/instruction/Instruction';
import PageNotFound from '../page-not-found/PageNotFound';
import RecipeTitle from '../../components/recipe/RecipeTitle';
import RecipeVisibilityButton from '../../components/recipe/RecipeVisibilityButton';

const RECIPE = gql`
  query Recipe($recipeId: ID!, $cookbookId: ID!) {
    recipe(recipeId: $recipeId, cookbookId: $cookbookId) {
      id
      cookbookId
      title
      description
      isPublic
      ingredients {
        id
        recipeId
        text
        isChecked
        instructionId
      }
      instructions {
        id
        recipeId
        step
        description
        tip
      }
    }
  }
`;

interface RecipeResponse {
  recipe: {
    id: string;
    cookbookId: string;
    title: string;
    description: string;
    isPublic: boolean;
    ingredients: [IngredientProps];
    instructions: [InstructionProps];
  };
}

function RecipePageEditionMode() {
  const { cookbookId, recipeId } = useParams<{
    cookbookId: string;
    recipeId: string;
  }>();

  const { data, loading, error } = useQuery<RecipeResponse>(RECIPE, {
    variables: { recipeId, cookbookId },
  });

  if (loading) return null;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;
  if (!data?.recipe) return <PageNotFound />;

  return (
    <li id={data.recipe.id}>
      <div>
        <RecipeTitle id={data.recipe.id} title={data.recipe.title} />
        <RecipeVisibilityButton
          recipeId={data.recipe.id}
          isPublic={data.recipe.isPublic}
        />
      </div>
      <p>
        {data.recipe.description}: Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Numquam adipisci eveniet tenetur rem mollitia! Molestiae voluptas natus,
        nostrum doloribus nam, alias facere at assumenda asperiores, animi excepturi nemo
        aliquid distinctio?
      </p>
      <ul>
        {data.recipe.ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            id={ingredient.id}
            recipeId={ingredient.recipeId}
            isChecked={ingredient.isChecked}
            text={ingredient.text}
          />
        ))}
      </ul>
      {data.recipe.instructions && (
        <ul>
          {data.recipe.instructions.map((instruction) => (
            <Instruction
              key={instruction.id}
              id={instruction.id}
              recipeId={instruction.recipeId}
              step={instruction.step}
              description={instruction.description}
              tip={instruction.tip}
            />
          ))}
        </ul>
      )}
      <div>
        <div>
          <CreateIngredientButton recipeId={data.recipe.id} />
        </div>
        <div>
          <CreateInstructionButton recipeId={data.recipe.id} />
        </div>
        <div>
          <DeleteRecipeButton
            recipeId={data.recipe.id}
            cookbookId={data.recipe.cookbookId}
          />
        </div>
      </div>
    </li>
  );
}

export default RecipePageEditionMode;
