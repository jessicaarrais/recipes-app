import gql from 'graphql-tag';
import { GET_NOTEBOOK } from './components/Notebook';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    username: String
  }
`;
