import React from 'react';
import './recipe-page-ingredients.css';

interface Props {
  ingredients: [{ id: string; text: string; instructionId: string }];
}

function RecipePageIngredients(props: Props) {
  return (
    <ul>
      {props.ingredients.map((ingredient) => (
        <li className="recipe-page-ingredients" key={ingredient.id}>
          <input type="checkbox" />
          {ingredient.text}
        </li>
      ))}
    </ul>
  );
}

export default RecipePageIngredients;
