import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Icon from './icon/Icon';

interface Props {
  recipeId: string;
  cookbookId: string;
}

function EditRecipeButton(props: Props) {
  const history = useHistory();
  return (
    <Button
      color="default"
      size="medium"
      fullWidth
      startIcon={<Icon icon="create" size="md-24" />}
      onClick={(event) => {
        event.preventDefault();
        history.push(`/edit/cookbook/${props.cookbookId}/recipe/${props.recipeId}`);
      }}
    >
      Edit
    </Button>
  );
}

export default EditRecipeButton;
