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
const apollo_datasource_1 = require("apollo-datasource");
const isemail_1 = __importDefault(require("isemail"));
const notebook_1 = __importDefault(require("./notebook"));
const store_1 = require("../store");
class User extends apollo_datasource_1.DataSource {
    constructor() {
        super();
        this.dbUser = store_1.dbUser;
    }
    initialize(config) {
        this.context = config.context;
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !isemail_1.default.validate(email))
                return null;
            yield store_1.db.sync();
            const user = yield this.dbUser.findOne({ where: { email } });
            return user;
        });
    }
    createUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isemail_1.default.validate(email))
                return null;
            yield store_1.db.sync();
            const emailExists = yield this.dbUser.findOne({ where: { email } });
            if (emailExists)
                throw new Error('Email already exists.');
            const newUser = yield this.dbUser.create({ email });
            const newNotebook = yield notebook_1.default.create(newUser.id);
            if (newNotebook) {
                yield newUser.update({
                    notebookId: newNotebook.id,
                });
            }
            return newUser;
        });
    }
    deleteUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.dbUser.findOne({
                where: { id: this.context.user.id },
            });
            return yield user.destroy();
        });
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map