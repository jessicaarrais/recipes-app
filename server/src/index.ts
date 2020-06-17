import { ApolloServer } from 'apollo-server';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import isEmail from 'isemail';
import typeDefs from './schema';
import resolvers from './resolvers';
import { dbUser, UserModel } from './store';
import User from './datasources/user';
import Avatar from './datasources/avatar';
import Todo from './datasources/todo';
import Sheet from './datasources/sheet';

interface MyContext {
  user: UserModel | null;
}
interface MyDataSources {
  dataSources: {
    userAPI: User;
    avatarAPI: Avatar;
    sheetAPI: Sheet;
    todoAPI: Todo;
  };
}
export type Context = MyContext & MyDataSources;

const dataSources = (): DataSources<Context> => ({
  userAPI: new User(),
  avatarAPI: new Avatar(),
  sheetAPI: new Sheet(),
  todoAPI: new Todo(),
});

const context = async ({ req }): Promise<MyContext> => {
  const auth = (req.headers && req.headers.authorization) || '';
  const email = Buffer.from(auth, 'base64').toString('ascii');
  if (!isEmail.validate(email)) return { user: null };
  const user = await dbUser.findOne({ where: { email } });

  return { user: user };
};

const server = new ApolloServer({
  context,
  dataSources,
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`server running on port ${url}`);
});
