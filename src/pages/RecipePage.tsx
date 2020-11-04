import React, { useState } from 'react';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { AppBar, Button, Icon, Tab, Tabs } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import Avatar from '../components/Avatar';
import FavoriteRecipeButton from '../components/FavoriteButton';
import { IngredientProps } from '../components/recipe-page-edit-mode/recipe-tabs-edit-mode-ingredient/Ingredient';
import Instruction, {
  InstructionProps,
} from '../components/recipe-page-edit-mode/recipe-tabs-edit-mode-instruction/Instruction';
import LikeButton from '../components/LikeButton';
import PageNotFound from './PageNotFound';
import { RECIPE_FRAGMENT } from '../components/RecipeCard';
import RecipeMenuButton from '../components/RecipeMenuButton';
import RecipeTitleEditMode from '../components/recipe-page-edit-mode/RecipeTitleEditMode';
import RecipeTabsPublicViewIngredients from '../components/recipe-page-public-view/RecipeTabsPublicViewIngredients';
import styled from 'styled-components';
import CreateInstructionButton from '../components/CreateInstructionButton';
import RecipeTabsPublicViewInstructions from '../components/recipe-page-public-view/RecipeTabsPublicViewInstructions';

const S = {
  Header: styled.header`
    display: flex;
    flex-wrap: wrap-reverse;
    align-items: center;
    justify-content: right;
    margin-bottom: 24px;
  `,

  UserProfileLink: styled(Link)`
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-inline-end: 16px;
  `,

  Title: styled.div`
    flex: 1;
    display: inline-block;
  `,

  RecipeName: styled.span`
    display: block;
    font-size: 32px;
  `,

  Ownership: styled.span`
    font-size: 16px;
    font-weight: bold;
  `,

  ActionsWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  Info: styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 24px 0;
  `,

  Description: styled.p`
    flex: 1;
    display: inline-block;
    margin: 0 8px 16px 8px;
    text-align: justify;
  `,

  Media: styled.div`
    flex: 1;
    width: 345px;
    height: 194px;
    background-color: lightgray;
    border-radius: 8px;
  `,

  Likes: styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
  `,

  TotalLikes: styled.p`
    margin: 0 4px;
  `,

  TabsWrapper: styled.div`
    width: 100%;
    margin: 24px auto;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    background-color: #ffffff;
    box-shadow: 1px 1px 1px 1px #bdbdbd;
  `,

  InstructionsList: styled.ul`
    padding: 0;
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
    ingredients: [IngredientProps];
    instructions: [InstructionProps];
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
  const isEditionModeOn = isEditing === 'editing';

  return (
    <>
      <S.Header>
        <S.UserProfileLink to={`/users/${data.recipe.owner.username}`}>
          <Avatar uri={data.recipe.owner.avatar?.uri} />
        </S.UserProfileLink>

        <S.Title>
          <S.RecipeName>
            {isOwner && isEditionModeOn ? (
              <RecipeTitleEditMode id={data.recipe.id} title={data.recipe.title} />
            ) : (
              data.recipe.title
            )}
          </S.RecipeName>
          <S.Ownership>by {data.recipe.owner.username}</S.Ownership>
        </S.Title>

        <S.ActionsWrapper>
          <LikeButton recipeId={data.recipe.id} isLiked={data.recipe.isLiked} />
          <FavoriteRecipeButton
            recipeId={data.recipe.id}
            isFavorite={data.recipe.isFavorite}
          />
          {isOwner && (
            <RecipeMenuButton
              isEditing={isEditionModeOn}
              recipeId={data.recipe.id}
              cookbookId={data.recipe.cookbookId}
              recipeTitle={data.recipe.title}
              isPublic={data.recipe.isPublic}
            />
          )}
        </S.ActionsWrapper>
      </S.Header>

      <S.Likes>
        <Icon fontSize="small">favorite</Icon>
        <S.TotalLikes>{data.recipe.likes}</S.TotalLikes>
      </S.Likes>

      <S.Info>
        <S.Description>{data.recipe.description}</S.Description>
        <div>
          <S.Media>image/video</S.Media>
        </div>
      </S.Info>

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

          <TabPanel value={TabSelector.INGREDIENTS}>
            <RecipeTabsPublicViewIngredients ingredients={data.recipe.ingredients} />
            <Button
              color="primary"
              variant="contained"
              size="medium"
              onClick={() => setActiveTab(TabSelector.INSTRUCTIONS)}
            >
              {isOwner && isEditionModeOn ? 'Go to instructions to edit!' : "I'm ready!"}
            </Button>
          </TabPanel>
          <TabPanel value={TabSelector.INSTRUCTIONS}>
            {isOwner && isEditionModeOn ? (
              <>
                <S.InstructionsList>
                  {data.recipe.instructions.map((instruction) => (
                    <Instruction
                      key={instruction.id}
                      instruction={instruction}
                      ingredients={data.recipe.ingredients}
                    />
                  ))}
                </S.InstructionsList>
                <div>
                  <CreateInstructionButton recipeId={data.recipe.id} />
                </div>
              </>
            ) : (
              <RecipeTabsPublicViewInstructions
                ingredients={data.recipe.ingredients}
                instructions={data.recipe.instructions}
              />
            )}
          </TabPanel>
        </TabContext>
      </S.TabsWrapper>
    </>
  );
}

export default RecipePage;
