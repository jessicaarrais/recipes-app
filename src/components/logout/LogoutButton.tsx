import React from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';

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
    <Button color="default" variant="contained" size="medium" onClick={() => logout()}>
      Logout
    </Button>
  );
}

export default LogoutButton;
