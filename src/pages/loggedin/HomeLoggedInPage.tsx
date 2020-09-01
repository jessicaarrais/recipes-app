import React from 'react';
import Cookbook from '../../components/cookbook/Cookbook';
import { RecipeProps } from '../../components/recipe/Recipe';
import { RecipesListOrder } from './LoggedInRoute';

interface Props {
  cookbookId: number;
  recipes: [RecipeProps];
  order: RecipesListOrder;
  refetchRecipes(order: RecipesListOrder): void;
  setOrder(order: RecipesListOrder): void;
}

function HomeLoggedInPage(props: Props) {
  return (
    <div>
      <Cookbook
        id={props.cookbookId}
        recipes={props.recipes}
        order={props.order}
        refetchRecipes={props.refetchRecipes}
        setOrder={props.setOrder}
      />
    </div>
  );
}

export default HomeLoggedInPage;
