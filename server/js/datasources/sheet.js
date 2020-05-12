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
class Sheet extends apollo_datasource_1.DataSource {
    constructor() {
        super();
        this.dbSheet = store_1.dbSheet;
    }
    initialize(config) {
        this.context = config.context;
    }
    getSheets(notebookId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbSheet
                .findAll({
                where: { notebookId },
            })
                .map((sheet) => __awaiter(this, void 0, void 0, function* () {
                return {
                    id: sheet.id,
                    notebookId: sheet.notebookId,
                    title: sheet.title,
                    sheet: yield this.context.dataSources.todoAPI.getTodos(sheet.id),
                };
            }));
        });
    }
    createSheet({ title, notebookId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbSheet.create({
                title,
                notebookId,
            });
        });
    }
    updateSheet(updatedSheet, sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dbSheet.update(updatedSheet, { where: { id: sheetId } });
        });
    }
    deleteSheet(sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbSheet.destroy({ where: { id: sheetId } });
        });
    }
}
exports.default = Sheet;
//# sourceMappingURL=sheet.js.map