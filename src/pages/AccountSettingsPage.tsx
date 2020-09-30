import React from 'react';
import { gql, useQuery } from '@apollo/client';
import UserSettings from '../components/UserSettings';
import LogoutButton from '../components/logout/LogoutButton';

export const ME = gql`
  query Me {
    me {
      id
      username
      avatar {
        uri
      }
    }
  }
`;

interface MeResponse {
  me: {
    id: string;
    username: string;
    avatar?: { uri: string };
  };
}

function AccountSettingsPage() {
  const { data, loading, error } = useQuery<MeResponse>(ME);

  if (loading) return null;
  if (error) return <h1>An error has occurred. ${error.message}</h1>;
  if (!data) return null;

  return (
    <>
      <LogoutButton />
      <hr />
      <UserSettings username={data.me.username} uri={data.me.avatar?.uri} />
    </>
  );
}

export default AccountSettingsPage;
