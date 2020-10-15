import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Icon } from '@material-ui/core';

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
      startIcon={<Icon>create</Icon>}
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
