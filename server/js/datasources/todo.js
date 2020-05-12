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
const apollo_datasource_1 = require("apollo-datasource");
const store_1 = require("../store");
class Todo extends apollo_datasource_1.DataSource {
    constructor() {
        super();
        this.dbTodo = store_1.dbTodo;
    }
    initialize(config) {
        this.context = config.context;
    }
    getTodos(sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbTodo
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
        });
    }
    createTodo({ text, isChecked, sheetId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbTodo.create({ text, isChecked, sheetId });
        });
    }
    updateTodo(updatedTodo, todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbTodo.update(updatedTodo, {
                where: { id: todoId },
            });
        });
    }
    deleteTodo(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dbTodo.destroy({ where: { id: todoId } });
        });
    }
}
exports.default = Todo;
//# sourceMappingURL=todo.js.map