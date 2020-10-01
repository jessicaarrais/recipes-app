import React from 'react';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import DeleteRecipeButton from './DeleteRecipeButton';
import EditRecipeButton from './EditRecipeButton';
import Icon from '../../icon/Icon';
import { IngredientProps, INGREDIENT_FRAGMENT } from '../../ingredient/Ingredient';
import { InstructionProps } from '../../instruction/Instruction';
import { RecipesListOrder } from '../../../pages/loggedin/HomeLoggedInPage';
import RecipeVisibilityButton from './RecipeVisibilityButton';
import './private-recipe-card.css';

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

export interface PrivateRecipeProps {
  id: string;
  cookbookId: string;
  owner: { username: string };
  title: string;
  description: string;
  likes: number;
  isPublic: boolean;
  ingredients: [IngredientProps];
  instructions: [InstructionProps];
  order: RecipesListOrder;
}

function PrivateRecipeCard(props: PrivateRecipeProps) {
  return (
    <li className="card">
      <Link to={`/cookbook/${props.cookbookId}/recipe/${props.title}/${props.id}`}>
        <div className="header">
          <h2 className="title">{props.title}</h2>
          <RecipeVisibilityButton recipeId={props.id} isPublic={props.isPublic} />
        </div>
        <p className="description">
          {props.description}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem qui et sed unde,
          impedit error praesentium mollitia tenetur earum, fugiat ullam quod dicta
          repellendus vero quia delectus vitae dolore. Facilis? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eligendi animi quam inventore quis doloribus
          asperiores earum corporis dicta! Repellendus eaque provident eos id optio
          aspernatur ipsum dolore explicabo eligendi reiciendis?
        </p>
        <div className="info">
          <span className="likes">
            <Icon icon="favorite" size="md-16" />
            <p>{props.likes}</p>
          </span>
          <span className="author-username">{props.owner.username}</span>
        </div>
        <hr />
        <div className="card-bottom">
          <div className="button-container">
            <EditRecipeButton recipeId={props.id} cookbookId={props.cookbookId} />
          </div>
          <div className="button-container">
            <DeleteRecipeButton recipeId={props.id} cookbookId={props.cookbookId} />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default PrivateRecipeCard;
