import React, { useState } from 'react';
import { Button, Icon, IconButton, Modal, TextField } from '@material-ui/core';
import CreateRecipeButton from './CreateRecipeButton';
import styled from 'styled-components';

const S = {
  ModalBody: styled.div`
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 516px;
    background-color: white;
    border-radius: 8px;
    padding: 0 16px 20px 16px;
  `,

  HeaderModalWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgray;
  `,

  Title: styled.h3`
    flex: 1;
    text-align: center;
    margin: 20px 0;
  `,
};

export default function NewRecipeModalButton() {
  const [inputValue, setInputValue] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        size="medium"
        fullWidth
        startIcon={<Icon>add</Icon>}
        onClick={handleOpen}
      >
        Create New Recipe
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="create new recipe">
        <S.ModalBody>
          <S.HeaderModalWrapper>
            <S.Title>Create New Recipe</S.Title>
            <IconButton onClick={handleClose}>
              <Icon fontSize="small">close</Icon>
            </IconButton>
          </S.HeaderModalWrapper>
          <TextField
            label="Title"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <CreateRecipeButton title={inputValue} isDisabled={inputValue === ''} />
        </S.ModalBody>
      </Modal>
    </>
  );
}
