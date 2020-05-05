const resolvers = {
  Query: {
    user: async (_, __, context) => await context.user,
  },

  Mutation: {
    createTodo: async (_, args, context) => {
      const sheet = await context.dataSources.userAPI.getTodos(args);
      const response = await context.dataSources.userAPI.createTodo(args);
      if (!response) {
        return {
          success: false,
          message: 'Failed creating todo',
        };
      }
      sheet.push(response);

      return { success: true, message: 'Todo created', sheet };
    },

    updateTodo: async (_, args, context) => {
      const todo = await context.dataSources.userAPI.updateTodo(args);
      console.log(todo);
      if (!todo) {
        return {
          success: false,
          message: 'Failed updating todo',
        };
      }
      const sheet = await context.dataSources.userAPI.getTodos(args);

      return { success: true, message: 'Todo updated', sheet };
    },

    deleteTodo: async (_, args, context) => {
      const todo = await context.dataSources.userAPI.deleteTodo(args);
      if (!todo) {
        return {
          success: false,
          message: 'Failed deleting todo',
        };
      }
      const sheet = await context.dataSources.userAPI.getTodos(args);

      return { success: true, message: 'Todo deleted', sheet };
    },

    createSheet: async (_, args, context) => {
      const notebook = await context.dataSources.userAPI.getSheets(args);

      const sheet = await context.dataSources.userAPI.createSheet(args);
      if (!sheet) {
        return {
          success: false,
          message: 'Failed creating sheet',
        };
      }
      notebook.push(sheet);

      return { success: true, message: 'Sheet created', notebook };
    },

    updateSheet: async (_, args, context) => {
      const sheet = await context.dataSources.userAPI.updateSheet(args);
      if (!sheet) {
        return {
          success: false,
          message: 'Failed to update sheet',
        };
      }
      const notebook = await context.dataSources.userAPI.getSheets(args);

      return { success: true, message: 'Sheet updated', notebook };
    },

    deleteSheet: async (_, args, context) => {
      const sheet = await context.dataSources.userAPI.deleteSheet(args);
      if (!sheet) {
        return {
          success: false,
          message: 'Failed to delete sheet',
        };
      }
      const notebook = await context.dataSources.userAPI.getSheets(args);

      return { success: true, message: 'Sheet deleted', notebook };
    },

    login: async (_, args, context) => {
      const user = await context.dataSources.userAPI.findOrCreateUser({
        email: args.email,
      });
      if (user) {
        return {
          userId: user.userId,
          email: user.email,
          notebookId: user.notebookId,
          auth: Buffer.from(args.email).toString('base64'),
        };
      }
    },
  },

  User: {
    notebook: async (_, __, context) =>
      await context.dataSources.userAPI.getSheets(context.user),
  },
};

module.exports = resolvers;
