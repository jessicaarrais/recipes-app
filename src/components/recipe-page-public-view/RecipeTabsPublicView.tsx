import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { Button } from '@material-ui/core';
import { TabPanel } from '@material-ui/lab';
import PageNotFound from '../../pages/PageNotFound';
import { RECIPE_FRAGMENT } from '../RecipeCard';
import RecipeTabsPublicViewIngredients from './RecipeTabsPublicViewIngredients';
import RecipeTabsPublicViewInstructions from './RecipeTabsPublicViewInstructions';
import { TabSelector } from '../../pages/RecipePage';

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
    ingredients: [{ id: string; text: string; instructionId: string }];
    instructions: [{ id: string; step: string; description: string; tip: string }];
  };
}

interface Props {
  setActiveTab(tab: TabSelector): void;
}

function RecipeTabsPublicView(props: Props) {
  const { cookbookId, recipeId } = useParams<{ cookbookId: string; recipeId: string }>();

  const { data, loading, error } = useQuery<RecipeResponse>(RECIPE, {
    variables: { recipeId, cookbookId },
  });

  if (loading) return null;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;
  if (!data?.recipe) return <PageNotFound />;

  return (
    <>
      <TabPanel value={TabSelector.INGREDIENTS}>
        <RecipeTabsPublicViewIngredients ingredients={data.recipe.ingredients} />
        <Button
          color="primary"
          variant="contained"
          size="medium"
          onClick={() => props.setActiveTab(TabSelector.INSTRUCTIONS)}
        >
          I am ready!
        </Button>
      </TabPanel>
      <TabPanel value={TabSelector.INSTRUCTIONS}>
        <RecipeTabsPublicViewInstructions
          ingredients={data.recipe.ingredients}
          instructions={data.recipe.instructions}
        />
      </TabPanel>
    </>
  );
}

export default RecipeTabsPublicView;
