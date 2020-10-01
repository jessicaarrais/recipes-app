import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Icon from '../../icon/Icon';

interface Props {
  recipeId: string;
  cookbookId: string;
}

function EditRecipeButton(props: Props) {
  const history = useHistory();
  return (
    <Button
      color="primary"
      variant="contained"
      size="medium"
      fullWidth
      onClick={(event) => {
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
