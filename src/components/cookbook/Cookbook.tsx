import React from 'react';
import Recipe from '../recipe/Recipe';
import CreateRecipeButton from './CreateRecipeButton';
import Button from '../styled-button/Button';
import Icon from '../Icon';
import './cookbook.css';

interface Props {
  id: number;
  recipes: [];
}

interface RecipeMap {
  id: number;
  cookbookId: number;
  title: string;
  isPublic: boolean;
  ingredients: [];
  instructions: [];
}

function Cookbook(props: Props) {
  return (
    <div>
      <div className="notebook-header">
        <div className="create-sheet-container">
          <CreateRecipeButton cookbookId={props.id} />
        </div>
        <div className="notebook-list-organizers-container">
          <div className="filter-list-container">
            <Button type="button" actionType="default">
              <Icon icon="filter_list" />
            </Button>
          </div>
          <div className="sort-list-container">
            <Button type="button" actionType="default">
              <Icon icon="sort" />
            </Button>
          </div>
        </div>
      </div>
      <ul className="notebook-ul">
        {props.recipes.map((recipe: RecipeMap) => (
          <Recipe
            key={recipe.id}
            id={recipe.id}
            cookbookId={recipe.cookbookId}
            title={recipe.title}
            isPublic={recipe.isPublic}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
          />
        ))}
      </ul>
    </div>
  );
}
export default Cookbook;
