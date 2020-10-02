import React from 'react';
import Icon from '../../icon/Icon';
import './recipe-page-instructions.css';

interface Props {
  ingredients: [{ id: string; text: string; instructionId: string }];
  instructions: [{ id: string; step: string; description: string; tip: string }];
}

function RecipePageInstructions(props: Props) {
  return (
    <ul>
      {props.instructions.map((instruction) => (
        <li className="recipe-page-instructions" key={instruction.id}>
          <div className="recipe-page-instructions-step">
            <p>{instruction.step}</p>
            <Icon icon="info" size="md-16" title={`Tip: ${instruction.tip}`} />
          </div>
          <p>{instruction.description}</p>
          <ul className="recipe-page-instructions-ingredients">
            {props.ingredients
              .filter((ingredient) => ingredient.instructionId === instruction.id)
              .map((ingredient) => (
                <li
                  className="recipe-page-instructions-convertable-ingredient"
                  key={ingredient.id}
                >
                  {ingredient.text}
                </li>
              ))}
          </ul>
          <hr />
        </li>
      ))}
    </ul>
  );
}

export default RecipePageInstructions;
