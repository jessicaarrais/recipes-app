import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Avatar from '../../components/avatar/Avatar';
import FavoriteRecipeButton from '../../components/favorite-button/FavoriteButton';
import Icon from '../../components/icon/Icon';
import LikeButton from '../../components/like-button/LikeButton';
import PageNotFound from '../PageNotFound/PageNotFound';
import './recipe-page.css';

const RECIPE = gql`
  query Recipe($recipeId: ID!, $cookbookId: ID!) {
    recipe(recipeId: $recipeId, cookbookId: $cookbookId) {
      id
      owner {
        username
        avatar {
          uri
        }
      }
      likes
      isFavorite
      isLiked
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
    owner: {
      username: string;
      avatar?: {
        uri: string;
      };
    };
    likes: number;
    isFavorite: boolean;
    isLiked: boolean;
    title: string;
    ingredients: [{ id: string; text: string }];
    instructions: [{ id: string; step: string; text: string }];
  };
}

function RecipePage() {
  const { cookbookId, recipeId } = useParams<{ cookbookId: string; recipeId: string }>();

  const { data, loading, error } = useQuery<RecipeResponse>(RECIPE, {
    variables: { recipeId, cookbookId },
  });

  if (loading) return null;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;
  if (!data?.recipe) return <PageNotFound />;

  return (
    <div>
      <Link to={`/users/${data.recipe.owner.username}`}>
        <div className="avatar">
          <Avatar uri={data.recipe.owner.avatar?.uri} />
        </div>
        <h2>{data.recipe.owner.username}</h2>
      </Link>
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
      <span className="likes">
        <Icon icon="favorite" size="md-16" />
        <p>{data.recipe.likes}</p>
      </span>
      <LikeButton recipeId={data.recipe.id} isLiked={data.recipe.isLiked} />
      <FavoriteRecipeButton
        recipeId={data.recipe.id}
        isFavorite={data.recipe.isFavorite}
      />
    </div>
  );
}

export default RecipePage;
