import React from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Button from '../components/styled-button/Button';
import UserSettings from '../components/UserSettings';

const LOGOUT = gql`
  mutation Logout($token: String) {
    logout(token: $token) {
      success
    }
  }
`;

interface Props {
  username: string;
  uri?: string;
}

function AccountSettingsPage(props: Props) {
  const client = useApolloClient();

  const [logout, { error }] = useMutation(LOGOUT, {
    onCompleted(data) {
      if (data.logout.success) localStorage.clear();
      client.cache.reset();
    },
  });

  if (error) return <h1>An error has ocurred</h1>;

  return (
    <>
      <Link to="/">Back to Home</Link>
      <Button
        type="button"
        actionType="default"
        handleOnClick={() =>
          logout({ variables: { token: localStorage.getItem('token') } })
        }
      >
        Logout
      </Button>
      <UserSettings username={props.username} uri={props.uri} />
    </>
  );
}

export default AccountSettingsPage;
