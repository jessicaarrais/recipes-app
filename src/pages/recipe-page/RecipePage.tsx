import React from 'react';
import { useParams } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import PageNotFound from '../PageNotFound/PageNotFound';

const RECIPE = gql`
  query Recipe($recipeId: ID!, $cookbookId: ID!) {
    recipe(recipeId: $recipeId, cookbookId: $cookbookId) {
      id
      title
      ingredients {
        id
        text
      }
      instructions {
        id
        step
        text
      }
    }
  }
`;

interface RecipeResponse {
  recipe: {
    id: string;
    title: string;
    ingredients: [{ id: string; text: string }];
    instructions: [{ id: string; step: string; text: string }];
  };
}

function RecipePage() {
  const { cookbookId, recipeId } = useParams();

  const { data, loading, error } = useQuery<RecipeResponse>(RECIPE, {
    variables: { recipeId, cookbookId },
  });

  if (loading) return null;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;
  if (!data?.recipe) return <PageNotFound />;

  return (
    <div>
      <h2>{data.recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul>
        {data.recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.text}</li>
        ))}
      </ul>
      <hr />
      <h3>Instructions</h3>
      {data.recipe.instructions.map((instruction) => (
        <div key={instruction.id}>
          <p>{instruction.step}</p>
          <p>{instruction.text}</p>
        </div>
      ))}
    </div>
  );
}

export default RecipePage;
