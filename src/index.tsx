import * as serviceWorker from './serviceWorker';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { ThemeProvider, Fab, Icon } from '@material-ui/core';
import LoggedInRoute from './routes/LoggedInRoute';
import LoggedOutRoute from './routes/LoggedOutRoute';
import theme from './theme';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalCSS = createGlobalStyle`
  body {
    background-color: #efefef;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  html {
    scroll-behavior: smooth;
  }

  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    word-wrap: break-word;
    text-decoration: none;
  }

  a {
    text-decoration: none;
    color: #000000;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 16px;
  }

  ul {
    margin: 0;
    padding: 16px 0;
    list-style: none;
  }
`;

const BackToTopArrow = styled.div`
  &.showed {
    display: block;
    width: 32px;
    height: 32px;
    position: fixed;
    right: 64px;
    bottom: 64px;
    opacity: 1;
    transition: display cubic-bezier(0, 0.3, 0.6, 1) 0.5s;
  }
  &.hidden {
    display: none;
    transition: display cubic-bezier(1, 0.6, 0.3, 0) 0.5s;
  }
`;

const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    me {
      id
    }
  }
`;

const uploadLink = createUploadLink({
  uri: 'https://rocky-oasis-65465.herokuapp.com/graphql',
});

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
  // typescript "Argument of type 'ApolloLink' is not assignable to parameter of type 'ApolloLink | RequestHandler'." error being ignored on uploadLink"
  // @ts-ignore
  link: authMiddleware.concat(uploadLink),
  cache,
  typeDefs: [],
  resolvers: {},
});

function LandingPage() {
  const [isShowingArrowUp, setIsShowingArrowUp] = useState('hidden');

  const { data, loading } = useQuery<{ me?: { id: string } }>(IS_LOGGED_IN);

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

  if (loading) return null;

  return (
    <>
      {data?.me?.id ? <LoggedInRoute /> : <LoggedOutRoute />}
      <BackToTopArrow className={isShowingArrowUp}>
        <Fab
          color="default"
          size="medium"
          aria-label="Back to top"
          disableRipple
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <Icon>keyboard_arrow_up</Icon>
        </Fab>
      </BackToTopArrow>
    </>
  );
}

const history = createBrowserHistory({ basename: '/recipes-app' });

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router history={history}>
          <GlobalCSS />
          <LandingPage />
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
