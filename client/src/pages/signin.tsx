import React, { useState } from 'react';

import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import Button from '../components/button';

const CREATE_USER = gql`
  mutation CreateUser($email: String) {
    signin(email: $email) {
      success
      message
      user {
        token
      }
    }
  }
`;

function Signin() {
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();
  let inputSignin: HTMLInputElement;

  const [signin, { error, loading }] = useMutation(CREATE_USER, {
    onCompleted(data) {
      if (!data.signin.success) {
        setErrorMessage(data.signin.message);
        return;
      }
      localStorage.setItem('token', data.signin.user.token);
      client.writeData({ data: { isLoggedIn: true } });
    },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has ocurred</h1>;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signin({ variables: { email: inputSignin.value } });
          inputSignin.value = '';
        }}
      >
        <input ref={(node) => (inputSignin = node as HTMLInputElement)} />
        <Button type="submit">Signin</Button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Signin;
