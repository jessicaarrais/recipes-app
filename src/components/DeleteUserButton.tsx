import React from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import Button from './styled-button/Button';
import Icon from './Icon';

const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser {
      me {
        id
        email
      }
    }
  }
`;

interface DeleteUserResponse {
  deleteUser: { me?: { id: number; email: string } };
}

function DeleteUserButton() {
  const client = useApolloClient();

  const [deleteUser, { loading, error }] = useMutation<DeleteUserResponse>(DELETE_USER, {
    onCompleted() {
      localStorage.clear();
      client.cache.reset();
    },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;

  return (
    <div>
      <Button type="button" actionType="danger" handleOnClick={() => deleteUser()}>
        <Icon icon="delete_forever" />
        delete account
      </Button>
    </div>
  );
}

export default DeleteUserButton;
