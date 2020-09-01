import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import DeleteUserButton from './DeleteUserButton';
import UploadAvatar from './UploadAvatar';
import EditableTextArea from './editable-text-area/EditableTextArea';

const UPDATE_USER = gql`
  mutation UpdateUser($username: String) {
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
      <EditableTextArea semanticalType="p" onSubmit={onSubmit}>
        {props.username}
      </EditableTextArea>
      {errorMessage === '' && <p>{errorMessage}</p>}
      <UploadAvatar uri={props.uri} />
      <DeleteUserButton />
    </>
  );
}

export default UserSettings;
