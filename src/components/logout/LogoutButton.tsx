import React from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import Button from '../../components/styled-button/Button';

const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

function LogoutButton() {
  const client = useApolloClient();

  const [logout, { error }] = useMutation<{ logout: { success: boolean } }>(LOGOUT, {
    onCompleted(data) {
      if (data.logout.success) {
        localStorage.clear();
        client.cache.reset();
      }
    },
  });

  if (error) return <h1>An error has ocurred</h1>;

  return (
    <Button type="button" actionType="default" handleOnClick={() => logout()}>
      Logout
    </Button>
  );
}

export default LogoutButton;
