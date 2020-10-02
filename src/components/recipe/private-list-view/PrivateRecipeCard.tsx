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
    <li className="private-recipe-card">
      <Link to={`/cookbook/${props.cookbookId}/recipe/${props.title}/${props.id}`}>
        <div className="private-recipe-card-header">
          <h2 className="private-recipe-card-title">{props.title}</h2>
          <RecipeVisibilityButton recipeId={props.id} isPublic={props.isPublic} />
        </div>
        <p className="private-recipe-card-description">
          {props.description}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem qui et sed unde,
          impedit error praesentium mollitia tenetur earum, fugiat ullam quod dicta
          repellendus vero quia delectus vitae dolore. Facilis? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eligendi animi quam inventore quis doloribus
          asperiores earum corporis dicta! Repellendus eaque provident eos id optio
          aspernatur ipsum dolore explicabo eligendi reiciendis?
        </p>
        <div className="private-recipe-card-info">
          <span className="private-recipe-card-likes">
            <Icon icon="favorite" size="md-16" />
            <p>{props.likes}</p>
          </span>
          <span className="private-recipe-card-author-username">
            {props.owner.username}
          </span>
        </div>
        <hr />
        <div className="private-recipe-card-bottom">
          <div className="private-recipe-card-actions">
            <EditRecipeButton recipeId={props.id} cookbookId={props.cookbookId} />
          </div>
          <div className="private-recipe-card-actions">
            <DeleteRecipeButton recipeId={props.id} cookbookId={props.cookbookId} />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default PrivateRecipeCard;
