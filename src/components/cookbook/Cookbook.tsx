import React from 'react';
import Button from '../styled-button/Button';
import Icon from '../icon/Icon';
import { RecipesListOrder } from '../../pages/loggedin/HomeLoggedInPage';
import './cookbook.css';

interface CookbookProps {
  createRecipeButton?: React.ReactNode;
  children: React.ReactNode;
  order: RecipesListOrder;
  refetchRecipes(order: RecipesListOrder): void;
  setOrder(order: RecipesListOrder): void;
}

export default function Cookbook(props: CookbookProps) {
  return (
    <div>
      <div className="notebook-header">
        <div className="create-recipe-container">{props.createRecipeButton}</div>
        <div className="notebook-list-organizers-container">
          <div className="filter-list-container">
            <Button type="button" actionType="default">
              <Icon icon="filter_list" size="md-24" />
            </Button>
          </div>
          <SortList
            order={props.order}
            refetchRecipes={props.refetchRecipes}
            setOrder={props.setOrder}
          />
        </div>
      </div>
      <ul>{props.children}</ul>
    </div>
  );
}

interface SortListProps {
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
        <Icon icon="sort" size="md-24" />
      </Button>
    </div>
  );
}
