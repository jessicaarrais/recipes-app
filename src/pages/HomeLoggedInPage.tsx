import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Cookbook from '../components/Cookbook';
import RecipeCard, { RECIPE_FRAGMENT, RecipeProps } from '../components/RecipeCard';
import CreateRecipeButton from '../components/CreateRecipeButton';

export const COOKBOOK_FRAGMENT = gql`
  fragment CookbookFragment on Cookbook {
    __typename
    id
    recipes(order: $recipesListOrder) {
      ...RecipeFragment
    }
  }
  ${RECIPE_FRAGMENT}
`;

export const GET_COOKBOOK = gql`
  query GetCookbook($recipesListOrder: RecipesListOrder) {
    me {
      id
      cookbook {
        ...CookbookFragment
      }
    }
  }
  ${COOKBOOK_FRAGMENT}
`;

export enum RecipesListOrder {
  DEFAULT = 'DEFAULT',
  TITLE_ASCENDING = 'TITLE_ASCENDING',
}

interface MeResponse {
  me: {
    id: string;
    cookbook: {
      id: string;
      recipes: [RecipeProps];
    };
  };
}

function HomeLoggedInPage() {
  const [order, setOrder] = useState(RecipesListOrder.DEFAULT);

  const { data, loading, error, refetch } = useQuery<MeResponse>(GET_COOKBOOK, {
    variables: { recipesListOrder: order },
  });

  if (loading) return null;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;
  if (!data) return null;

  return (
    <>
      <Cookbook
        createRecipeButton={<CreateRecipeButton />}
        order={order}
        refetchRecipes={(order) => refetch({ recipesListOrder: order })}
        setOrder={setOrder}
      >
        {data.me.cookbook.recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            cookbookId={recipe.cookbookId}
            owner={recipe.owner}
            title={recipe.title}
            description={recipe.description}
            likes={recipe.likes}
            isFavorite={recipe.isFavorite}
            isLiked={recipe.isLiked}
            isPublic={recipe.isPublic}
          />
        ))}
      </Cookbook>
    </>
  );
}

export default HomeLoggedInPage;
