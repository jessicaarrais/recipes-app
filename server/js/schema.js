"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
  type Query {
    user(email: String): User
  }

  type Mutation {
    createTodo(
      text: String
      isChecked: Boolean
      sheetId: ID!
    ): TodoUpdateResponse

    updateTodo(
      todoId: ID!
      text: String
      isChecked: Boolean
      sheetId: ID!
    ): TodoUpdateResponse

    deleteTodo(todoId: ID!, sheetId: ID!): TodoUpdateResponse

    createSheet(title: String, notebookId: ID!): SheetUpdateResponse

    updateSheet(
      sheetId: ID!
      title: String
      notebookId: ID!
    ): SheetUpdateResponse

    deleteSheet(sheetId: ID!, notebookId: ID!): SheetUpdateResponse

    signin(email: String): UserResponse

    login(email: String): UserResponse

    deleteUser: UserResponse
  }

  type UserResponse {
    success: Boolean
    message: String
    user: User
  }

  type TodoUpdateResponse {
    success: Boolean
    message: String
    sheet: [Todo]
  }

  type SheetUpdateResponse {
    success: Boolean
    message: String
    notebook: [Sheet]
  }

  type Todo {
    id: ID!
    sheetId: ID!
    text: String
    isChecked: Boolean
  }

  type Sheet {
    id: ID!
    notebookId: ID!
    title: String
    sheet: [Todo]
  }

  type Notebook {
    id: ID!
    notebook: [Sheet]
  }

  type User {
    id: ID!
    email: String
    auth: String
    notebook: Notebook
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=schema.js.map