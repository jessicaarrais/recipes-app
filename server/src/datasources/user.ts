import { DataSource, DataSourceConfig } from 'apollo-datasource';
import isEmail from 'isemail';
import Notebook from './notebook';
import { db, dbUser, UserStatic, UserModel } from '../store';
import { Sequelize } from 'sequelize/types';
import { Context } from '..';

class User extends DataSource {
  db: Sequelize;
  dbUser: UserStatic;
  context: Context;

  initialize(config: DataSourceConfig<Context>): void | Promise<void> {
    this.context = config.context;
  }

  async findUserByEmail(email: string): Promise<UserModel> {
    if (!email || !isEmail.validate(email)) return null;

    await db.sync();
    const user = await dbUser.findOne({ where: { email } });

    return user;
  }

  async createUser(email: string): Promise<UserModel> {
    if (!isEmail.validate(email)) return null;

    await db.sync();
    const emailExists = await dbUser.findOne({ where: { email } });
    if (emailExists) throw new Error('Email already exists.');

    const newUser = await dbUser.create({ email });
    const newNotebook = await Notebook.create(newUser.id);
    if (newNotebook) {
      await newUser.update({
        notebookId: newNotebook.id,
      });
    }

    return newUser;
  }

  async deleteUser(): Promise<void> {
    const user = await dbUser.findOne({
      where: { id: this.context.user.id },
    });

    return await user.destroy();
  }
}

export default User;
