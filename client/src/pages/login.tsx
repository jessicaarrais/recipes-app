import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation login($email: String!) {
    login(email: $email) {
      success
      message
      user {
        id
        email
        token
        notebook {
          id
          notebook {
            id
            notebookId
            title
            sheet {
              id
              sheetId
              text
              isChecked
            }
          }
        }
      }
    }
  }
`;

function Login() {
  const client = useApolloClient();
  let inputLogin: HTMLInputElement;

  const [login, { data, loading }] = useMutation(LOGIN, {
    onCompleted(data) {
      localStorage.setItem('token', data.login.user.token);
      client.writeData({
        data: { isLoggedIn: true, notebook: data.login.user.notebook.notebook },
      });
    },
    onError(error) {
      console.log(error.message);
      console.log(data);
    },
  });

  if (loading) return <h1>ahuashuashsu</h1>;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ variables: { email: inputLogin.value } });
          inputLogin.value = '';
        }}
      >
        <input
          ref={(node) => {
            inputLogin = node as HTMLInputElement;
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;
