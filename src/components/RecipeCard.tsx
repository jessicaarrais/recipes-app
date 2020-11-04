import React from 'react';
import { gql, useApolloClient } from '@apollo/client';
import { Link } from 'react-router-dom';
import FavoriteRecipeButton from './FavoriteButton';
import { Icon } from '@material-ui/core';
import { INGREDIENT_FRAGMENT } from './recipe-page-edit-mode/recipe-tabs-edit-mode-ingredient/Ingredient';
import LikeButton from './LikeButton';
import RecipeVisibilityButton from './RecipeVisibilityButton';
import styled from 'styled-components';
import urlParser from '../utils/urlParser';
import EditRecipeButton from './EditRecipeButton';
import DeleteRecipeButton from './DeleteRecipeButton';

const S = {
  Card: styled.li`
    width: 100%;
    padding: 24px;
    margin-bottom: 16px;
    border-radius: 8px;
    background-color: #ffffff;
    border-left: solid 32px #cb9b8c;
    box-shadow: 1px 1px 1px 1px #bdbdbd;
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
  `,

  Title: styled.h2`
    margin: 0 0 20px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 1;
  `,

  Description: styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  `,

  Info: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Likes: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 28px;
  `,

  AuthorUsername: styled.span`
    font-size: 16px;
    font-weight: bold;
  `,

  Bottom: styled.div`
    display: flex;
    margin: 0 -4px;
  `,

  Actions: styled.div`
    display: flex;
    flex: 1;
    margin: 0 4px;
  `,
};

export const RECIPE_FRAGMENT = gql`
  fragment RecipeFragment on Recipe {
    __typename
    id
    owner {
      id
      username
      avatar {
        uri
      }
    }
    cookbookId
    title
    description
    isPublic
    likes
    isFavorite
    isLiked
    ingredients {
      ...IngredientFragment
    }
    instructions {
      id
      recipeId
      step
      description
      tip
    }
  }
  ${INGREDIENT_FRAGMENT}
`;

export interface RecipeProps {
  id: string;
  cookbookId: string;
  owner: { id: string; username: string };
  title: string;
  description: string;
  likes: number;
  isFavorite: boolean;
  isLiked: boolean;
  isPublic: boolean;
}

function RecipeCard(props: RecipeProps) {
  const userLoggedIn: { me: { id: string } } | null = useApolloClient().readQuery({
    query: gql`
      query Me {
        me {
          id
        }
      }
    `,
  });
  const titleURL = urlParser(props.title);

  const isOwner = userLoggedIn?.me?.id === props.owner.id;

  return (
    <S.Card>
      <Link to={`/cookbook/${props.cookbookId}/recipe/${titleURL}/${props.id}`}>
        <S.Header>
          <S.Title>{props.title}</S.Title>
          {isOwner && (
            <RecipeVisibilityButton recipeId={props.id} isPublic={props.isPublic} />
          )}
        </S.Header>
        <S.Description>
          {props.description}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem qui et sed unde,
          impedit error praesentium mollitia tenetur earum, fugiat ullam quod dicta
          repellendus vero quia delectus vitae dolore. Facilis? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eligendi animi quam inventore quis doloribus
          asperiores earum corporis dicta! Repellendus eaque provident eos id optio
          aspernatur ipsum dolore explicabo eligendi reiciendis?
        </S.Description>
        <S.Info>
          <S.Likes>
            <Icon fontSize="small">favorite</Icon>
            <p>{props.likes}</p>
          </S.Likes>
          <S.AuthorUsername>{props.owner.username}</S.AuthorUsername>
        </S.Info>
        <hr />
        <S.Bottom>
          {isOwner ? (
            <>
              <S.Actions>
                <EditRecipeButton
                  recipeTitle={props.title}
                  recipeId={props.id}
                  cookbookId={props.cookbookId}
                />
              </S.Actions>
              <S.Actions>
                <DeleteRecipeButton recipeId={props.id} cookbookId={props.cookbookId} />
              </S.Actions>
            </>
          ) : (
            <>
              <S.Actions>
                <LikeButton recipeId={props.id} isLiked={props.isLiked} />
              </S.Actions>
              <S.Actions>
                <FavoriteRecipeButton recipeId={props.id} isFavorite={props.isFavorite} />
              </S.Actions>
            </>
          )}
        </S.Bottom>
      </Link>
    </S.Card>
  );
}

export default RecipeCard;
