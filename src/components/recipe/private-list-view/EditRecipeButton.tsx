import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../styled-button/Button';
import Icon from '../../icon/Icon';

interface Props {
  recipeId: string;
  cookbookId: string;
}

function EditRecipeButton(props: Props) {
  const history = useHistory();
  return (
    <Button
      type="button"
      actionType="primary"
      handleOnClick={(event) => {
        event.preventDefault();
        history.push(`/edit/cookbook/${props.cookbookId}/recipe/${props.recipeId}`);
      }}
    >
      <Icon icon="create" size="md-24" />
      Edit
    </Button>
  );
}

export default EditRecipeButton;
