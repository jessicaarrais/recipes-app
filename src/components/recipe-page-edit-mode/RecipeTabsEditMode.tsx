import React from 'react';
import { useParams } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import CreateIngredientButton from '../CreateIngredientButton';
import CreateInstructionButton from '../CreateInstructionButton';
import Ingredient, {
  IngredientProps,
} from './recipe-tabs-edit-mode-ingredient/Ingredient';
import Instruction, {
  InstructionProps,
} from './recipe-tabs-edit-mode-instruction/Instruction';
import PageNotFound from '../../pages/PageNotFound';
import { RECIPE_FRAGMENT } from '../RecipeCard';
import { TabSelector } from '../../pages/RecipePage';
import { TabPanel } from '@material-ui/lab';

const RECIPE = gql`
  query Recipe($recipeId: ID!, $cookbookId: ID!) {
    recipe(recipeId: $recipeId, cookbookId: $cookbookId) {
      ...RecipeFragment
    }
  }
  ${RECIPE_FRAGMENT}
`;

interface RecipeResponse {
  recipe: {
    id: string;
    ingredients: [IngredientProps];
    instructions: [InstructionProps];
  };
}

function RecipeTabsEditMode() {
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
    <>
      <TabPanel value={TabSelector.INGREDIENTS}>
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
      </TabPanel>
      <TabPanel value={TabSelector.INSTRUCTIONS}>
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
      </TabPanel>
      <div>
        <div>
          <CreateIngredientButton recipeId={data.recipe.id} />
        </div>
        <div>
          <CreateInstructionButton recipeId={data.recipe.id} />
        </div>
      </div>
    </>
  );
}

export default RecipeTabsEditMode;
