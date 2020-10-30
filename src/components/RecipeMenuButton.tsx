import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, IconButton, Menu, MenuItem, Theme, withStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import EditRecipeButton from './EditRecipeButton';
import RecipeVisibilityButton from './RecipeVisibilityButton';
import DeleteRecipeButton from './DeleteRecipeButton';
import styled from 'styled-components';

const S = {
  RecipeMenuWrapper: styled.div`
    margin-inline-start: 8px;
  `,
};

const MenuButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[300]),
    backgroundColor: grey[300],
    '&:hover': {
      backgroundColor: grey[400],
    },
  },
}))(IconButton);

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
    <S.RecipeMenuWrapper>
      {props.isEditing ? (
        <MenuButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={(event) => {
            event.preventDefault();
            history.push(
              `/cookbook/${props.cookbookId}/recipe/${props.recipeTitle}/${props.recipeId}`
            );
          }}
        >
          <Icon>close</Icon>
        </MenuButton>
      ) : (
        <>
          <MenuButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            aria-label="Menu"
            onClick={handleOpen}
          >
            <Icon>more_horiz</Icon>
          </MenuButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
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
    </S.RecipeMenuWrapper>
  );
}

export default RecipeMenuButton;
