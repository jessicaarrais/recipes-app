const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const createStore = require('./store');
const User = require('./datasource/user');

const store = createStore();

const dataSources = () => ({ userAPI: new User(store) });

const context = async ({ req }) => {
  const auth = (req.headers && req.headers.authorization) || '';
  const email = Buffer.from(auth, 'base64').toString('ascii');
  if (!isEmail.validate(email)) return { user: null };
  const user = await store.user.findOrCreate({ where: { email } });

  return { user: { ...user[0].dataValues } };
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
