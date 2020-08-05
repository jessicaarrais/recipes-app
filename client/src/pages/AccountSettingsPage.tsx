import React from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import UserSettings from '../components/UserSettings';

interface Props {
  username: string;
  uri?: string;
}

function AccountSettingsPage(props: Props) {
  const client = useApolloClient();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    client.cache.reset();
    client.writeQuery({
      query: gql`
        query IsLoggedIn {
          isLoggedIn
        }
      `,
      data: { isLoggedIn: false, me: null },
    });
    history.push('/home');
  };

  return (
    <>
      <Link to="/home">Back to Home</Link>
      <Button type="button" actionType="default" handleOnClick={handleLogout}>
        Logout
      </Button>
      <UserSettings username={props.username} uri={props.uri} />
    </>
  );
}

export default AccountSettingsPage;
