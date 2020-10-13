import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import DeleteUserButton from './DeleteUserButton';
import EditableTextArea from './editable-text-area/EditableTextArea';
import UploadAvatar from './UploadAvatar';
import { Typography } from '@material-ui/core';

const UPDATE_USER = gql`
  mutation UpdateUser($username: String!) {
    updateUser(username: $username) {
      success
      message
      me {
        id
        username
      }
    }
  }
`;

interface UpdateUserResponse {
  updateUser: {
    success: boolean;
    message: string;
    me?: {
      id: string;
      username: string;
    };
  };
}

interface Props {
  username: string;
  uri?: string;
}

function UserSettings(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');

  const [updateUser, { error }] = useMutation<UpdateUserResponse>(UPDATE_USER, {
    onCompleted(data) {
      if (!data.updateUser.success) {
        setErrorMessage(data.updateUser.message);
      } else {
        setErrorMessage('');
      }
    },
  });

  const onSubmit = (username: string): void => {
    updateUser({ variables: { username } });
  };

  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <>
      {errorMessage !== '' && (
        <Typography color="error" variant="subtitle1" gutterBottom>
          {errorMessage}
        </Typography>
      )}
      <EditableTextArea semanticalType="p" onSubmit={onSubmit}>
        {props.username}
      </EditableTextArea>
      <UploadAvatar uri={props.uri} />
      <DeleteUserButton />
    </>
  );
}

export default UserSettings;
