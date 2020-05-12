import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { dbTodo, TodoStatic, TodoModel } from '../store';
import { Context } from '..';
import { TodoGQL } from '../schema';

interface NewTodo {
  text: string;
  isChecked: boolean;
  sheetId: number;
}

interface UpdatedTodo {
  text: string;
  isChecked: boolean;
}

class Todo extends DataSource {
  dbTodo: TodoStatic;
  context: Context;

  constructor() {
    super();
    this.dbTodo = dbTodo;
  }

  initialize(config: DataSourceConfig<any>): void | Promise<void> {
    this.context = config.context;
  }

  async getTodos(sheetId: number): Promise<Array<TodoGQL>> {
    return await this.dbTodo
      .findAll({
        where: { sheetId },
      })
      .map((todo) => {
        return {
          id: todo.id,
          sheetId: todo.sheetId,
          text: todo.text,
          isChecked: todo.isChecked,
        };
      });
  }

  async createTodo({ text, isChecked, sheetId }: NewTodo): Promise<TodoModel> {
    return await this.dbTodo.create({ text, isChecked, sheetId });
  }

  async updateTodo(
    updatedTodo: UpdatedTodo,
    todoId: number
  ): Promise<[number, TodoModel[]]> {
    return await this.dbTodo.update(updatedTodo, {
      where: { id: todoId },
    });
  }

  async deleteTodo(todoId: number): Promise<number> {
    return this.dbTodo.destroy({ where: { id: todoId } });
  }
}

export default Todo;
