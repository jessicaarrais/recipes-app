import React, { useState } from 'react';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Avatar from '../../components/avatar/Avatar';
import { Button, AppBar, Tabs, Tab } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import EditRecipeButton from '../../components/recipe/EditRecipeButton';
import FavoriteRecipeButton from '../../components/FavoriteButton';
import Icon from '../../components/icon/Icon';
import LikeButton from '../../components/LikeButton';
import PageNotFound from '../page-not-found/PageNotFound';
import { RECIPE_FRAGMENT } from '../../components/recipe/recipe-card/RecipeCard';
import RecipePageIngredients from '../../components/recipe/recipe-page-ingredients/RecipePageIngredients';
import RecipePageInstructions from '../../components/recipe/recipe-page-instructions/RecipePageInstructions';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  margin-top: 32px;
`;

const HeaderTextWrapper = styled.div`
  flex: 1;
  margin-right: 32px;
`;

const HeaderMediaWrapper = styled.div`
  flex: 1;
  background-color: lightgray;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
`;

const TotalLikes = styled.p`
  margin: 0 4px;
`;

const UserProfileLink = styled(Link)`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
`;

const Title = styled.span`
  font-size: 32px;
`;

const TabsWrapper = styled.div`
  width: 100%;
  padding: 16px 24px 24px;
  margin: 24px auto;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 1px 1px 1px 1px #bdbdbd;
`;

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
      <Header>
        <HeaderTextWrapper>
          <UserProfileLink to={`/users/${data.recipe.owner.username}`}>
            <Avatar uri={data.recipe.owner.avatar?.uri} />
          </UserProfileLink>
          <h4>
            <Title>{data.recipe.title} </Title>
            by {data.recipe.owner.username}
          </h4>
          <p>{data.recipe.description}</p>
        </HeaderTextWrapper>
        <HeaderMediaWrapper>image/video</HeaderMediaWrapper>
      </Header>
      <Likes>
        <Icon icon="favorite" size="md-16" />
        <TotalLikes>{data.recipe.likes}</TotalLikes>
      </Likes>
      <div className="recipe-page-actions">
        <LikeButton recipeId={data.recipe.id} isLiked={data.recipe.isLiked} />
        <FavoriteRecipeButton
          recipeId={data.recipe.id}
          isFavorite={data.recipe.isFavorite}
        />
        {userLoggedIn?.me?.id === data.recipe.owner.id && (
          <EditRecipeButton
            recipeId={data.recipe.id}
            cookbookId={data.recipe.cookbookId}
          />
        )}
      </div>
      <TabsWrapper>
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
      </TabsWrapper>
    </>
  );
}

export default RecipePage;
