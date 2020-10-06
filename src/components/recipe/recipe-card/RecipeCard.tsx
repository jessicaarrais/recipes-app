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
import urlParser from '../../../utils/urlParser';
import './recipe-card.css';

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

  const myRecipe = userLoggedIn?.me.id === props.owner.id;

  return (
    <li className="recipe-card">
      <Link to={`/cookbook/${props.cookbookId}/recipe/${titleURL}/${props.id}`}>
        <div className="recipe-card-header">
          <h2 className="recipe-card-title">{props.title}</h2>
          {myRecipe && (
            <RecipeVisibilityButton recipeId={props.id} isPublic={props.isPublic} />
          )}
        </div>
        <p className="recipe-card-description">
          {props.description}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem qui et sed unde,
          impedit error praesentium mollitia tenetur earum, fugiat ullam quod dicta
          repellendus vero quia delectus vitae dolore. Facilis? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eligendi animi quam inventore quis doloribus
          asperiores earum corporis dicta! Repellendus eaque provident eos id optio
          aspernatur ipsum dolore explicabo eligendi reiciendis?
        </p>
        <div className="recipe-card-info">
          <span className="recipe-card-likes">
            <Icon icon="favorite" size="md-16" />
            <p>{props.likes}</p>
          </span>
          <span className="recipe-card-author-username">{props.owner.username}</span>
        </div>
        <hr />
        <div className="recipe-card-bottom">
          {myRecipe ? (
            <>
              <div className="recipe-card-actions">
                <EditRecipeButton recipeId={props.id} cookbookId={props.cookbookId} />
              </div>
              <div className="recipe-card-actions">
                <DeleteRecipeButton recipeId={props.id} cookbookId={props.cookbookId} />
              </div>
            </>
          ) : (
            <>
              <div className="recipe-card-actions">
                <LikeButton recipeId={props.id} isLiked={props.isLiked} />
              </div>
              <div className="recipe-card-actions">
                <FavoriteRecipeButton recipeId={props.id} isFavorite={props.isFavorite} />
              </div>
            </>
          )}
        </div>
      </Link>
    </li>
  );
}

export default RecipeCard;
