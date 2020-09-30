import React from 'react';
import Icon from '../icon/Icon';

interface Props {
  ingredients: [{ id: string; text: string; instructionId: string }];
  instructions: [{ id: string; step: string; description: string; tip: string }];
}

function RecipePageInstructions(props: Props) {
  return (
    <ul className="tab-content">
      {props.instructions.map((instruction) => (
        <li className="instruction" key={instruction.id}>
          <div className="instruction-step">
            <p>{instruction.step}</p>
            <Icon icon="info" size="md-16" title={`Tip: ${instruction.tip}`} />
          </div>
          <p>{instruction.description}</p>
          <ul className="instruction-ingredient">
            {props.ingredients
              .filter((ingredient) => ingredient.instructionId === instruction.id)
              .map((ingredient) => (
                <li className="convertable-ingredient" key={ingredient.id}>
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
