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
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        user: (_, __, context) => context.user,
    },
    Mutation: {
        createTodo: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const sheet = yield context.dataSources.todoAPI.getTodos(args.sheetId);
            const response = yield context.dataSources.todoAPI.createTodo({
                text: args.text,
                isChecked: args.isChecked,
                sheetId: args.sheetId,
            });
            if (!response) {
                return {
                    success: false,
                    message: 'Failed creating todo',
                };
            }
            sheet.push(response);
            return { success: true, message: 'Todo created', sheet };
        }),
        updateTodo: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const todo = yield context.dataSources.todoAPI.updateTodo({ text: args.text, isChecked: args.isChecked }, args.todoId);
            if (!todo) {
                return {
                    success: false,
                    message: 'Failed updating todo',
                };
            }
            const sheet = yield context.dataSources.todoAPI.getTodos(args.sheetId);
            return { success: true, message: 'Todo updated', sheet };
        }),
        deleteTodo: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const todo = yield context.dataSources.todoAPI.deleteTodo(args.todoId);
            if (!todo) {
                return {
                    success: false,
                    message: 'Failed deleting todo',
                };
            }
            const sheet = yield context.dataSources.todoAPI.getTodos(args.sheetId);
            return { success: true, message: 'Todo deleted', sheet };
        }),
        createSheet: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const notebook = yield context.dataSources.sheetAPI.getSheets(args.notebookId);
            const sheet = yield context.dataSources.sheetAPI.createSheet({
                title: args.title,
                notebookId: args.notebookId,
            });
            if (!sheet) {
                return {
                    success: false,
                    message: 'Failed creating sheet',
                };
            }
            notebook.push(sheet);
            return { success: true, message: 'Sheet created', notebook };
        }),
        updateSheet: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const sheet = yield context.dataSources.sheetAPI.updateSheet({ title: args.title }, args.sheetId);
            if (!sheet) {
                return {
                    success: false,
                    message: 'Failed to update sheet',
                };
            }
            const notebook = yield context.dataSources.sheetAPI.getSheets(args.notebookId);
            return { success: true, message: 'Sheet updated', notebook };
        }),
        deleteSheet: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const sheet = yield context.dataSources.sheetAPI.deleteSheet(args.sheetId);
            if (!sheet) {
                return {
                    success: false,
                    message: 'Failed to delete sheet',
                };
            }
            const notebook = yield context.dataSources.sheetAPI.getSheets(args.notebookId);
            return { success: true, message: 'Sheet deleted', notebook };
        }),
        signin: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newUser = yield context.dataSources.userAPI.createUser(args.email);
                return {
                    success: true,
                    message: 'Created',
                    user: {
                        id: newUser.id,
                        notebookId: newUser.notebookId,
                        email: newUser.email,
                        auth: Buffer.from(args.email).toString('base64'),
                    },
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        }),
        login: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield context.dataSources.userAPI.findUserByEmail(args.email);
            if (!user) {
                return {
                    success: false,
                    message: 'Failed logging in',
                };
            }
            return {
                success: true,
                message: 'Logged',
                user: {
                    id: user.id,
                    notebookId: user.notebookId,
                    email: user.email,
                    auth: Buffer.from(args.email).toString('base64'),
                },
            };
        }),
        deleteUser: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            const user = Object.assign({}, context.user.dataValues);
            const deletedUser = yield context.dataSources.userAPI.deleteUser();
            if (!deletedUser) {
                return {
                    success: false,
                    message: 'User not deleted',
                };
            }
            return { success: true, message: 'User deleted', user };
        }),
    },
    User: {
        notebook: (user, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            return {
                id: user.notebookId,
                notebook: context.dataSources.sheetAPI.getSheets(user.notebookId),
            };
        }),
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map