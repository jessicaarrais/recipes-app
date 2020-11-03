import React, { useState } from 'react';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Avatar from '../components/Avatar';
import { AppBar, Icon, Tab, Tabs } from '@material-ui/core';
import { TabContext } from '@material-ui/lab';
import FavoriteRecipeButton from '../components/FavoriteButton';
import LikeButton from '../components/LikeButton';
import PageNotFound from './PageNotFound';
import { RECIPE_FRAGMENT } from '../components/RecipeCard';
import RecipeTabsPublicView from '../components/recipe-page-public-view/RecipeTabsPublicView';
import RecipeTabsEditMode from '../components/recipe-page-edit-mode/RecipeTabsEditMode';
import RecipeTitleEditMode from '../components/recipe-page-edit-mode/RecipeTitleEditMode';
import styled from 'styled-components';
import RecipeMenuButton from '../components/RecipeMenuButton';

const S = {
  Header: styled.header`
    display: flex;
    margin-top: 32px;
  `,

  HeaderTextWrapper: styled.div`
    flex: 1;
    margin-right: 32px;
  `,

  HeaderMediaWrapper: styled.div`
    flex: 1;
    background-color: lightgray;
  `,

  Likes: styled.div`
    display: flex;
    align-items: center;
  `,

  TotalLikes: styled.p`
    margin: 0 4px;
  `,

  UserProfileLink: styled(Link)`
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
  `,

  Title: styled.span`
    font-size: 32px;
    margin-inline-end: 8px;
  `,

  TabsWrapper: styled.div`
    width: 100%;
    padding: 16px 24px 24px;
    margin: 24px auto;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 1px 1px 1px 1px #bdbdbd;
  `,
};

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
    isPublic: boolean;
  };
}

export enum TabSelector {
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
  const [activeTab, setActiveTab] = useState<TabSelector>(TabSelector.INGREDIENTS);
  const { isEditing, cookbookId, recipeId } = useParams<{
    isEditing: string;
    cookbookId: string;
    recipeId: string;
  }>();
  const { data, loading, error } = useQuery<RecipeResponse>(RECIPE, {
    variables: { recipeId, cookbookId },
  });

  if (loading) return null;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;
  if (!data?.recipe) return <PageNotFound />;

  const isOwner = userLoggedIn?.me?.id === data.recipe.owner.id;
  const editionModeOn = isEditing === 'editing';

  return (
    <>
      <S.Header>
        <S.HeaderTextWrapper>
          <S.UserProfileLink to={`/users/${data.recipe.owner.username}`}>
            <Avatar uri={data.recipe.owner.avatar?.uri} />
          </S.UserProfileLink>
          <h4>
            <S.Title>
              {isOwner && editionModeOn ? (
                <RecipeTitleEditMode id={data.recipe.id} title={data.recipe.title} />
              ) : (
                data.recipe.title
              )}
            </S.Title>
            by {data.recipe.owner.username}
          </h4>
          <p>{data.recipe.description}</p>
        </S.HeaderTextWrapper>
        <S.HeaderMediaWrapper>image/video</S.HeaderMediaWrapper>
      </S.Header>
      <RecipeMenuButton
        isEditing={editionModeOn}
        recipeId={data.recipe.id}
        cookbookId={data.recipe.cookbookId}
        recipeTitle={data.recipe.title}
        isPublic={data.recipe.isPublic}
      />
      <S.Likes>
        <Icon>favorite</Icon>
        <S.TotalLikes>{data.recipe.likes}</S.TotalLikes>
      </S.Likes>
      <div className="recipe-page-actions">
        <LikeButton recipeId={data.recipe.id} isLiked={data.recipe.isLiked} />
        <FavoriteRecipeButton
          recipeId={data.recipe.id}
          isFavorite={data.recipe.isFavorite}
        />
      </div>
      <S.TabsWrapper>
        <TabContext value={activeTab}>
          <AppBar position="static" color="transparent">
            <Tabs
              value={activeTab}
              onChange={(_e, value) => setActiveTab(value)}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Ingredients" value={TabSelector.INGREDIENTS} />
              <Tab label="Instructions" value={TabSelector.INSTRUCTIONS} />
            </Tabs>
          </AppBar>
          {isOwner && editionModeOn ? (
            <RecipeTabsEditMode />
          ) : (
            <RecipeTabsPublicView setActiveTab={setActiveTab} />
          )}
        </TabContext>
      </S.TabsWrapper>
    </>
  );
}

export default RecipePage;
