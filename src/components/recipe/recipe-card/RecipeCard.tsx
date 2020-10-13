import React from 'react';
import { gql, useApolloClient } from '@apollo/client';
import { Link } from 'react-router-dom';
import DeleteRecipeButton from '../DeleteRecipeButton';
import EditRecipeButton from '../EditRecipeButton';
import FavoriteRecipeButton from '../../FavoriteButton';
import Icon from '../../icon/Icon';
import { INGREDIENT_FRAGMENT } from '../../ingredient/Ingredient';
import LikeButton from '../../LikeButton';
import RecipeVisibilityButton from '../RecipeVisibilityButton';
import styled from 'styled-components';
import urlParser from '../../../utils/urlParser';

const Card = styled.li`
  width: 100%;
  padding: 24px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  border-left: solid 32px #cb9b8c;
  box-shadow: 1px 1px 1px 1px #bdbdbd;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h2`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 1;
`;

const Description = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Likes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 28px;
`;

const AuthorUsername = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const Bottom = styled.div`
  display: flex;
  margin: 0 -4px;
`;

const Actions = styled.div`
  display: flex;
  flex: 1;
  margin: 0 4px;
`;

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
    <Card>
      <Link to={`/cookbook/${props.cookbookId}/recipe/${titleURL}/${props.id}`}>
        <Header>
          <Title>{props.title}</Title>
          {isOwner && (
            <RecipeVisibilityButton recipeId={props.id} isPublic={props.isPublic} />
          )}
        </Header>
        <Description>
          {props.description}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem qui et sed unde,
          impedit error praesentium mollitia tenetur earum, fugiat ullam quod dicta
          repellendus vero quia delectus vitae dolore. Facilis? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eligendi animi quam inventore quis doloribus
          asperiores earum corporis dicta! Repellendus eaque provident eos id optio
          aspernatur ipsum dolore explicabo eligendi reiciendis?
        </Description>
        <Info>
          <Likes>
            <Icon icon="favorite" size="md-16" />
            <p>{props.likes}</p>
          </Likes>
          <AuthorUsername>{props.owner.username}</AuthorUsername>
        </Info>
        <hr />
        <Bottom>
          {isOwner ? (
            <>
              <Actions>
                <EditRecipeButton recipeId={props.id} cookbookId={props.cookbookId} />
              </Actions>
              <Actions>
                <DeleteRecipeButton recipeId={props.id} cookbookId={props.cookbookId} />
              </Actions>
            </>
          ) : (
            <>
              <Actions>
                <LikeButton recipeId={props.id} isLiked={props.isLiked} />
              </Actions>
              <Actions>
                <FavoriteRecipeButton recipeId={props.id} isFavorite={props.isFavorite} />
              </Actions>
            </>
          )}
        </Bottom>
      </Link>
    </Card>
  );
}

export default RecipeCard;
