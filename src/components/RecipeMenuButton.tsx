import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Icon, IconButton, Menu, MenuItem } from '@material-ui/core';
import EditRecipeButton from './EditRecipeButton';
import RecipeVisibilityButton from './RecipeVisibilityButton';
import DeleteRecipeButton from './DeleteRecipeButton';

interface Props {
  isEditing: boolean;
  recipeId: string;
  cookbookId: string;
  recipeTitle: string;
  isPublic: boolean;
}

function RecipeMenuButton(props: Props) {
  const history = useHistory();
  const [anchorEl, setAnchor] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <div>
      {props.isEditing ? (
        <Button
          color="default"
          variant="outlined"
          size="medium"
          startIcon={<Icon>close</Icon>}
          onClick={(event) => {
            event.preventDefault();
            history.push(
              `/cookbook/${props.cookbookId}/recipe/${props.recipeTitle}/${props.recipeId}`
            );
          }}
        >
          Cancel
        </Button>
      ) : (
        <>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleOpen}
          >
            <Icon>more_horiz</Icon>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <EditRecipeButton
                recipeTitle={props.recipeTitle}
                recipeId={props.recipeId}
                cookbookId={props.cookbookId}
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <RecipeVisibilityButton
                recipeId={props.recipeId}
                isPublic={props.isPublic}
              />
              Visibility
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <DeleteRecipeButton
                recipeId={props.recipeId}
                cookbookId={props.cookbookId}
              />
            </MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
}

export default RecipeMenuButton;
