"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const isemail_1 = __importDefault(require("isemail"));
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
const store_1 = require("./store");
const user_1 = __importDefault(require("./datasources/user"));
const todo_1 = __importDefault(require("./datasources/todo"));
const sheet_1 = __importDefault(require("./datasources/sheet"));
const dataSources = () => ({
    userAPI: new user_1.default(),
    sheetAPI: new sheet_1.default(),
    todoAPI: new todo_1.default(),
});
const context = ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = (req.headers && req.headers.authorization) || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');
    if (!isemail_1.default.validate(email))
        return { user: null };
    const user = yield store_1.dbUser.findOne({ where: { email } });
    return { user: user };
});
const server = new apollo_server_1.ApolloServer({
    context,
    dataSources,
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
});
server.listen().then(({ url }) => {
    console.log(`server running on port ${url}`);
});
//# sourceMappingURL=index.js.map