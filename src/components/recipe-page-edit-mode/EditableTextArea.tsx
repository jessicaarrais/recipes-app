import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';

const S = {
  ButtonsWrapper: styled.div`
    display: flex;
  `,

  Actions: styled.div`
    flex: 1;
    margin: 8px;
  `,

  Span: styled.span`
    font-style: italic;
    padding: 16px 8px;
    &:hover {
      background-color: antiquewhite;
    }
  `,
};

interface Props {
  semanticalType: 'h2' | 'p';
  children: string;
  onSubmit(text: string): void;
}

function EditableTextArea(props: Props) {
  const [text, setNewText] = useState(props.children);
  const [isEditing, setIsEditing] = useState(false);

  const update = (text: string): void => {
    setIsEditing(false);
    if (text !== props.children) {
      props.onSubmit(text);
    }
  };

  return (
    <>
      {isEditing ? (
        <div>
          <TextField
            variant="outlined"
            autoFocus
            fullWidth
            ref={(ref) => {
              ref && ref.focus();
            }}
            type="text"
            value={text}
            onChange={(e) => setNewText(e.target.value)}
          />
          <S.ButtonsWrapper>
            <S.Actions>
              <Button
                size="small"
                variant="contained"
                fullWidth
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                discard
              </Button>
            </S.Actions>
            <S.Actions>
              <Button
                color="primary"
                size="small"
                variant="contained"
                fullWidth
                onClick={() => {
                  update(text);
                }}
              >
                save
              </Button>
            </S.Actions>
          </S.ButtonsWrapper>
        </div>
      ) : (
        <S.Span
          tabIndex={0}
          onClick={() => {
            setIsEditing(true);
            setNewText(props.children);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsEditing(true);
              setNewText(props.children);
            }
          }}
        >
          {props.children}
        </S.Span>
      )}
    </>
  );
}

export default EditableTextArea;
