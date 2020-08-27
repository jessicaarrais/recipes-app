import React from 'react';
import Cookbook from '../../components/cookbook/Cookbook';
import { RecipeProps } from '../../components/recipe/Recipe';

interface Props {
  cookbookId: number;
  recipes: [RecipeProps];
}

function HomeLoggedInPage(props: Props) {
  return (
    <div>
      <Cookbook id={props.cookbookId} recipes={props.recipes} />
    </div>
  );
}

export default HomeLoggedInPage;
