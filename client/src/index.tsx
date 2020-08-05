import * as serviceWorker from './serviceWorker';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql,
  useQuery,
} from '@apollo/client';
import { typeDefs } from './resolvers';
import LoggedInRoute from './pages/LoggedInRoute';
import LoggedOutRoute from './pages/LoggedOutRoute';
import Button from './components/Button';
import Icon from './components/Icon';
import './index.css';

const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || null,
      'client-name': 'recipes-app',
      'client-version': '1.0.0',
    },
  }));
  return forward(operation);
});

const cache = new InMemoryCache({
  typePolicies: {
    Cookbook: {
      fields: {
        recipes: {
          merge(existing = [], incoming: any[]) {
            return incoming;
          },
        },
      },
    },
    Recipe: {
      fields: {
        ingredients: {
          merge(existing = [], incoming: any[]) {
            return incoming;
          },
        },
        instructions: {
          merge(existing = [], incoming: any[]) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache,
  typeDefs,
  resolvers: {},
});

client.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

const history = createBrowserHistory();

function LandingPage() {
  const [isShowingArrowUp, setIsShowingArrowUp] = useState('hidden');

  const { data } = useQuery(IS_LOGGED_IN);

  const handleScroll = () => {
    if (window.scrollY <= 260) {
      setIsShowingArrowUp('hidden');
    } else {
      setIsShowingArrowUp('showed');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
      {data.isLoggedIn ? <LoggedInRoute /> : <LoggedOutRoute />}
      <div className={`back-to-top-icon ${isShowingArrowUp}`} title="back to top">
        <Button
          type="button"
          actionType="default"
          handleOnClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <Icon icon="keyboard_arrow_up" />
        </Button>
      </div>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router history={history}>
        <LandingPage />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
