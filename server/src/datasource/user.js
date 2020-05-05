const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class User extends DataSource {
  constructor(store) {
    super();
    this.store = store;
    this.getTodos = this.getTodos.bind(this);
  }

  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    await this.store.db.sync();
    const response = await this.store.user.findOrCreate({ where: { email } });
    const user = response && response[0];
    if (!user.notebookId) {
      const notebookResponse = await this.store.notebook.create({
        userId: user.userId,
      });
      if (notebookResponse) {
        await user.update({ notebookId: notebookResponse.notebookId });
      }
    }

    return user;
  }

  //Todo handlers
  async getTodos(args) {
    const sheet = await this.store.todo
      .findAll({
        where: { sheetId: args.sheetId },
      })
      .map((todo) => ({
        ...todo.dataValues,
      }));

    return sheet;
  }

  async createTodo(args) {
    const todo = await this.store.todo.create({
      text: args.text,
      isChecked: args.isChecked,
      sheetId: args.sheetId,
    });

    return todo;
  }

  async updateTodo(args) {
    const todo = await this.store.todo.update(
      { text: args.text, isChecked: args.isChecked },
      {
        where: {
          todoId: args.todoId,
        },
      }
    );

    return todo;
  }

  async deleteTodo(args) {
    return this.store.todo.destroy({ where: { todoId: args.todoId } });
  }

  //Sheet hanldlers
  async getSheets(args) {
    const notebook = await this.store.sheet
      .findAll({
        where: { notebookId: args.notebookId },
      })
      .map(async (sheet) => {
        return {
          ...sheet.dataValues,
          sheet: await this.getTodos(sheet.dataValues),
        };
      });

    return notebook;
  }

  async createSheet(args) {
    const sheet = await this.store.sheet.create({
      title: args.title,
      notebookId: args.notebookId,
    });

    return sheet;
  }

  async updateSheet(args) {
    const sheet = this.store.sheet.update(
      { title: args.title },
      { where: { sheetId: args.sheetId } }
    );

    return sheet;
  }

  async deleteSheet(args) {
    return await this.store.sheet.destroy({ where: { sheetId: args.sheetId } });
  }
}

module.exports = User;
