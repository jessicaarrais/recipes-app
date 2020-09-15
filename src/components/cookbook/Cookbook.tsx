import React from 'react';
import Recipe, { RecipeProps } from '../recipe/Recipe';
import CreateRecipeButton from './CreateRecipeButton';
import Button from '../styled-button/Button';
import Icon from '../Icon';
import './cookbook.css';
import { RecipesListOrder } from '../../pages/loggedin/HomeLoggedInPage';

interface CookbookProps {
  id: string;
  recipes: [RecipeProps];
  order: RecipesListOrder;
  refetchRecipes(order: RecipesListOrder): void;
  setOrder(order: RecipesListOrder): void;
}

export default function Cookbook(props: CookbookProps) {
  return (
    <div>
      <div className="notebook-header">
        <div className="create-sheet-container">
          <CreateRecipeButton />
        </div>
        <div className="notebook-list-organizers-container">
          <div className="filter-list-container">
            <Button type="button" actionType="default">
              <Icon icon="filter_list" />
            </Button>
          </div>
          <SortList
            cookbookId={props.id}
            order={props.order}
            refetchRecipes={props.refetchRecipes}
            setOrder={props.setOrder}
          />
        </div>
      </div>
      <ul className="notebook-ul">
        {props.recipes.map((recipe) => (
          <Recipe
            key={recipe.id}
            id={recipe.id}
            cookbookId={recipe.cookbookId}
            title={recipe.title}
            isPublic={recipe.isPublic}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            order={props.order}
          />
        ))}
      </ul>
    </div>
  );
}

interface SortListProps {
  cookbookId: string;
  order: RecipesListOrder;
  refetchRecipes(order: RecipesListOrder): void;
  setOrder(oreder: RecipesListOrder): void;
}

function SortList(props: SortListProps) {
  const nextOrder =
    props.order === RecipesListOrder.TITLE_ASCENDING
      ? RecipesListOrder.DEFAULT
      : RecipesListOrder.TITLE_ASCENDING;

  const handleOnSortList = (): void => {
    props.refetchRecipes(nextOrder);
    props.setOrder(nextOrder);
  };

  return (
    <div className="sort-list-container" onClick={handleOnSortList}>
      <Button type="button" actionType="default">
        <Icon icon="sort" />
      </Button>
    </div>
  );
}
