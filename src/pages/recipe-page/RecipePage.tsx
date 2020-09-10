import React from 'react';
import { useParams } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import Avatar from '../../components/avatar/Avatar';
import PageNotFound from '../PageNotFound/PageNotFound';
import FavoriteRecipeButton from '../../components/FavoriteButton';

const RECIPE = gql`
  query Recipe($recipeId: ID!, $cookbookId: ID!) {
    getRecipe(recipeId: $recipeId, cookbookId: $cookbookId) {
      owner {
        username
        avatar {
          uri
        }
      }
      recipe {
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
      me {
        id
        favoriteRecipes
      }
    }
  }
`;

interface RecipeResponse {
  getRecipe: {
    owner: {
      username: string;
      avatar?: {
        uri: string;
      };
    };
    recipe: {
      id: string;
      title: string;
      ingredients: [{ id: string; text: string }];
      instructions: [{ id: string; step: string; text: string }];
    };
    me: { id: string; favoriteRecipes: [string] };
  };
}

function RecipePage() {
  const { cookbookId, recipeId } = useParams();

  const { data, loading, error } = useQuery<RecipeResponse>(RECIPE, {
    variables: { recipeId, cookbookId },
  });

  if (loading) return null;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;
  if (!data?.getRecipe) return <PageNotFound />;

  const isFavorite = data.getRecipe.me.favoriteRecipes.includes(data.getRecipe.recipe.id);

  return (
    <div>
      <div style={{ width: '150px' }}>
        <Avatar uri={data.getRecipe.owner.avatar?.uri} />
      </div>
      <h2>{data.getRecipe.owner.username}</h2>
      <h2>{data.getRecipe.recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul>
        {data.getRecipe.recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.text}</li>
        ))}
      </ul>
      <hr />
      <h3>Instructions</h3>
      {data.getRecipe.recipe.instructions.map((instruction) => (
        <div key={instruction.id}>
          <p>{instruction.step}</p>
          <p>{instruction.text}</p>
        </div>
      ))}
      <FavoriteRecipeButton recipeId={data.getRecipe.recipe.id} isFavorite={isFavorite} />
    </div>
  );
}

export default RecipePage;
