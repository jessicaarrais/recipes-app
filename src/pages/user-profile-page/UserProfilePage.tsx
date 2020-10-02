import React, { useState } from 'react';
import { useParams } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import Avatar from '../../components/avatar/Avatar';
import Cookbook from '../../components/cookbook/Cookbook';
import { RecipesListOrder } from '../loggedin/HomeLoggedInPage';
import PublicRecipeCard, {
  PublicRecipeProps,
} from '../../components/recipe/public-list-view/PublicRecipeCard';
import { RECIPE_FRAGMENT } from '../../components/recipe/private-list-view/PrivateRecipeCard';
import './user-profile-page.css';

const GET_USER = gql`
  query User($username: String, $recipesListOrder: RecipesListOrder) {
    user(username: $username) {
      id
      username
      avatar {
        uri
      }
      cookbook {
        id
        recipes(order: $recipesListOrder) {
          ...RecipeFragment
        }
      }
    }
  }
  ${RECIPE_FRAGMENT}
`;

interface UserResponse {
  user?: {
    id: string;
    username: string;
    avatar?: { uri: string };
    cookbook: {
      id: string;
      recipes: [PublicRecipeProps];
    };
  };
}

function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [order, setOrder] = useState(RecipesListOrder.DEFAULT);

  const { data, loading, error, refetch } = useQuery<UserResponse>(GET_USER, {
    variables: { username, recipesListOrder: order },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  const user = data?.user;
  return user ? (
    <div>
      <h2>{user.username}</h2>
      <div className="user-profile-page-avatar">
        <Avatar uri={user.avatar?.uri} />
      </div>
      <Cookbook
        order={order}
        refetchRecipes={(order) => refetch({ recipesListOrder: order })}
        setOrder={setOrder}
      >
        {user.cookbook.recipes.map((recipe) => (
          <PublicRecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            cookbookId={recipe.cookbookId}
            owner={recipe.owner}
            likes={recipe.likes}
            isFavorite={recipe.isFavorite}
            isLiked={recipe.isLiked}
          />
        ))}
      </Cookbook>
    </div>
  ) : (
    <h3>User not found</h3>
  );
}

export default UserProfilePage;
