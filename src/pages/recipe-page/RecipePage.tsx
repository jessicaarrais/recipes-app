import React from 'react';
import { useParams } from 'react-router';
import { gql, useQuery } from '@apollo/client';

const RECIPE = gql`
  query Recipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
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

function RecipePage() {
  const { recipeId } = useParams();

  const { data, loading, error } = useQuery(RECIPE, { variables: { recipeId } });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <div>
      <h2>{data?.recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul>
        {data?.recipe.ingredients.map((ingredient: { id: number; text: string }) => (
          <li key={ingredient.id}>{ingredient.text}</li>
        ))}
      </ul>
      <hr />
      <h3>Instructions</h3>
      {data?.recipe.instructions.map(
        (instruction: { id: number; step: string; text: string }) => (
          <div key={instruction.id}>
            <p>{instruction.step}</p>
            <p>{instruction.text}</p>
          </div>
        )
      )}
    </div>
  );
}

export default RecipePage;
