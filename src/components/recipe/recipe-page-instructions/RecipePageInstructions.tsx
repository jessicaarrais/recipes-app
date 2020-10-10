import React from 'react';
import Icon from '../../icon/Icon';
import styled from 'styled-components';

const Instruction = styled.li`
  padding: 16px 0;
`;

const InstructionStep = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Ingredients = styled.ul`
  display: flex;
`;

const Ingredient = styled.li`
  margin: 2px;
  padding: 8px;
  border: 1px solid lightskyblue;
  border-radius: 8px;
`;

interface Props {
  ingredients: [{ id: string; text: string; instructionId: string }];
  instructions: [{ id: string; step: string; description: string; tip: string }];
}

function RecipePageInstructions(props: Props) {
  return (
    <ul>
      {props.instructions.map((instruction) => (
        <Instruction key={instruction.id}>
          <InstructionStep>
            <p>{instruction.step}</p>
            <Icon icon="info" size="md-16" title={`Tip: ${instruction.tip}`} />
          </InstructionStep>
          <p>{instruction.description}</p>
          <Ingredients>
            {props.ingredients
              .filter((ingredient) => ingredient.instructionId === instruction.id)
              .map((ingredient) => (
                <Ingredient key={ingredient.id}>{ingredient.text}</Ingredient>
              ))}
          </Ingredients>
          <hr />
        </Instruction>
      ))}
    </ul>
  );
}

export default RecipePageInstructions;
