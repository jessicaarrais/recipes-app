import React, { useState, useRef } from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import Button from './Button';
import '../assets/css/login-signup.css';

const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      email: $email
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      __typename
      success
      message
      me {
        username
        token
      }
    }
  }
`;

function Signup() {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordErrorRef = useRef<HTMLParagraphElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordErrorRef = useRef<HTMLParagraphElement>(null);
  const passwordRegex = new RegExp(
    '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,12}$'
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailInputSignup, setEmailInputSignup] = useState('');
  const [usernameInputSignup, setUsernameInputSignup] = useState('');
  const [passwordInputSignup, setPasswordInputSignup] = useState('');
  const [confirmPasswordInputSignup, setconfirmPasswordInputSignup] = useState('');

  const client = useApolloClient();

  const [signup, { error, loading }] = useMutation(CREATE_USER, {
    onCompleted(data) {
      if (!data.signup.success) {
        setErrorMessage(data.signup.message);
        return;
      }
      localStorage.setItem('token', data.signup.me.token);
      client.cache.reset();
    },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has ocurred</h1>;

  return (
    <div className="login-signup-card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup({
            variables: {
              email: emailInputSignup,
              username: usernameInputSignup,
              password: passwordInputSignup,
              confirmPassword: confirmPasswordInputSignup,
            },
          });
        }}
      >
        <input
          className="login-signup-input"
          placeholder="E-mail"
          value={emailInputSignup}
          onChange={(e) => setEmailInputSignup(e.target.value)}
        />
        <input
          className="login-signup-input"
          placeholder="Username"
          value={usernameInputSignup}
          onChange={(e) => setUsernameInputSignup(e.target.value)}
        />
        <div className="input-msg-container">
          <p ref={passwordErrorRef} className="hidden-error-msg">
            Invalid password format
          </p>
          <input
            ref={passwordInputRef}
            className="login-signup-input"
            type="password"
            placeholder="Password eg.: p@SSword2020"
            onChange={(e) => {
              setPasswordInputSignup(e.target.value);
              if (passwordRegex.test(e.target.value) || e.target.value === '') {
                passwordInputRef.current?.classList.remove('wrong-typo');
                passwordErrorRef.current?.classList.replace(
                  'error-message',
                  'hidden-error-msg'
                );
              } else {
                passwordInputRef.current?.classList.add('wrong-typo');
                passwordErrorRef.current?.classList.replace(
                  'hidden-error-msg',
                  'error-message'
                );
              }
            }}
          />
        </div>
        <div className="input-msg-container">
          <p ref={confirmPasswordErrorRef} className="hidden-error-msg">
            Passwords do not match
          </p>
          <input
            ref={confirmPasswordInputRef}
            className="login-signup-input"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setconfirmPasswordInputSignup(e.target.value);
              if (passwordInputSignup !== e.target.value) {
                confirmPasswordInputRef.current?.classList.add('wrong-typo');
                confirmPasswordErrorRef.current?.classList.replace(
                  'hidden-error-msg',
                  'error-message'
                );
              } else {
                confirmPasswordInputRef.current?.classList.remove('wrong-typo');
                confirmPasswordErrorRef.current?.classList.replace(
                  'error-message',
                  'hidden-error-msg'
                );
              }
            }}
          />
        </div>
        <ul className="password-hint">
          Your password must:
          <li>be betweem 8 and 12 characters;</li>
          <li>contain at least 1 number;</li>
          <li>contain at least 1 uppercase and lowercase letters of each.</li>
        </ul>
        <div className="login-signup-btn">
          <Button type="submit" actionType="default">
            Signup
          </Button>
        </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Signup;
