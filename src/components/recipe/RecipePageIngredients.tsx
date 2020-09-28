import React from 'react';

interface Props {
  ingredients: [{ id: string; text: string; instructionId: string }];
}

function RecipePageIngredients(props: Props) {
  return (
    <ul className="tab-content">
      {props.ingredients.map((ingredient) => (
        <li className="ingredient" key={ingredient.id}>
          <input type="checkbox" />
          {ingredient.text}
        </li>
      ))}
    </ul>
  );
}

export default RecipePageIngredients;
