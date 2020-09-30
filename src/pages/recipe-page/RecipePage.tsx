import React, { useState } from 'react';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Avatar from '../../components/avatar/Avatar';
import { Button, AppBar, Tabs, Tab } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import EditRecipeButton from '../../components/recipe/private-list-view/EditRecipeButton';
import FavoriteRecipeButton from '../../components/favorite-button/FavoriteButton';
import Icon from '../../components/icon/Icon';
import LikeButton from '../../components/like-button/LikeButton';
import PageNotFound from '../pageNotFound/PageNotFound';
import { RECIPE_FRAGMENT } from '../../components/recipe/private-list-view/PrivateRecipeCard';
import RecipePageIngredients from '../../components/recipe/RecipePageIngredients';
import RecipePageInstructions from '../../components/recipe/RecipePageInstructions';
import './recipe-page.css';

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
    cookbookId: string;
    owner: {
      id: string;
      username: string;
      avatar?: {
        uri: string;
      };
    };
    title: string;
    description: string;
    likes: number;
    isFavorite: boolean;
    isLiked: boolean;
    ingredients: [{ id: string; text: string; instructionId: string }];
    instructions: [{ id: string; step: string; description: string; tip: string }];
  };
}

enum TabSelector {
  INGREDIENTS = 'ingredients',
  INSTRUCTIONS = 'instructions',
}

function RecipePage() {
  const userLoggedIn: { me: { id: string } } | null = useApolloClient().readQuery({
    query: gql`
      query Me {
        me {
          id
        }
      }
    `,
  });
  const { cookbookId, recipeId } = useParams<{ cookbookId: string; recipeId: string }>();
  const [activeTab, setActiveTab] = useState<TabSelector>(TabSelector.INGREDIENTS);

  const { data, loading, error } = useQuery<RecipeResponse>(RECIPE, {
    variables: { recipeId, cookbookId },
  });

  if (loading) return null;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;
  if (!data?.recipe) return <PageNotFound />;

  return (
    <>
      <header className="recipe-page-header">
        <div className="header-text">
          <Link to={`/users/${data.recipe.owner.username}`} className="avatar">
            <Avatar uri={data.recipe.owner.avatar?.uri} />
          </Link>
          <h4 className="recipe-page-title">
            <span>{data.recipe.title} </span>
            by {data.recipe.owner.username}
          </h4>
          <p>
            {data.recipe.description} Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Iusto facere impedit cupiditate voluptatum iste quos eos voluptas sunt
            culpa perspiciatis dolorem, veniam at nisi natus, rerum perferendis aperiam
            sint quo.
          </p>
        </div>
        <div className="header-media">image/video</div>
      </header>
      <span className="likes">
        <Icon icon="favorite" size="md-16" />
        <p>{data.recipe.likes}</p>
      </span>
      <div className="recipe-actions">
        <LikeButton recipeId={data.recipe.id} isLiked={data.recipe.isLiked} />
        <FavoriteRecipeButton
          recipeId={data.recipe.id}
          isFavorite={data.recipe.isFavorite}
        />
        {userLoggedIn?.me.id === data.recipe.owner.id && (
          <EditRecipeButton
            recipeId={data.recipe.id}
            cookbookId={data.recipe.cookbookId}
          />
        )}
      </div>
      <section className="tabs">
        <TabContext value={activeTab}>
          <AppBar position="static" color="transparent">
            <Tabs
              value={activeTab}
              onChange={(_e, value) => setActiveTab(value)}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="icon tabs example"
            >
              <Tab label="Ingredients" value={TabSelector.INGREDIENTS} />
              <Tab label="Instructions" value={TabSelector.INSTRUCTIONS} />
            </Tabs>
          </AppBar>
          <TabPanel value={TabSelector.INGREDIENTS}>
            <RecipePageIngredients ingredients={data.recipe.ingredients} />
            <Button
              color="primary"
              variant="contained"
              size="medium"
              onClick={() => setActiveTab(TabSelector.INSTRUCTIONS)}
            >
              I am ready!
            </Button>
          </TabPanel>
          <TabPanel value={TabSelector.INSTRUCTIONS}>
            <RecipePageInstructions
              ingredients={data.recipe.ingredients}
              instructions={data.recipe.instructions}
            />
          </TabPanel>
        </TabContext>
      </section>
    </>
  );
}

export default RecipePage;
