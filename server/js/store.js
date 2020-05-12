"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
exports.db = new sequelize_typescript_1.Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
});
exports.dbUser = exports.db.define('user', {
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: sequelize_typescript_1.DataType.STRING,
    notebookId: sequelize_typescript_1.DataType.INTEGER,
    token: sequelize_typescript_1.DataType.STRING,
    createdAt: sequelize_typescript_1.DataType.DATE,
    updatedAt: sequelize_typescript_1.DataType.DATE,
    deletedAt: sequelize_typescript_1.DataType.DATE,
});
exports.dbNotebook = exports.db.define('notebook', {
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: sequelize_typescript_1.DataType.INTEGER,
    createdAt: sequelize_typescript_1.DataType.DATE,
    updatedAt: sequelize_typescript_1.DataType.DATE,
    deletedAt: sequelize_typescript_1.DataType.DATE,
});
exports.dbSheet = exports.db.define('sheet', {
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    notebookId: sequelize_typescript_1.DataType.INTEGER,
    title: sequelize_typescript_1.DataType.STRING,
    createdAt: sequelize_typescript_1.DataType.DATE,
    updatedAt: sequelize_typescript_1.DataType.DATE,
    deletedAt: sequelize_typescript_1.DataType.DATE,
});
exports.dbTodo = exports.db.define('todo', {
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sheetId: sequelize_typescript_1.DataType.INTEGER,
    text: sequelize_typescript_1.DataType.STRING,
    isChecked: sequelize_typescript_1.DataType.BOOLEAN,
    createdAt: sequelize_typescript_1.DataType.DATE,
    updatedAt: sequelize_typescript_1.DataType.DATE,
    deletedAt: sequelize_typescript_1.DataType.DATE,
});
exports.dbUser.hasOne(exports.dbNotebook);
exports.dbNotebook.belongsTo(exports.dbUser, { foreignKey: 'userId', onDelete: 'CASCADE' });
exports.dbNotebook.hasMany(exports.dbSheet);
exports.dbSheet.belongsTo(exports.dbNotebook, {
    foreignKey: 'notebookId',
    onDelete: 'CASCADE',
});
exports.dbSheet.hasMany(exports.dbTodo);
exports.dbTodo.belongsTo(exports.dbSheet, { foreignKey: 'sheetId', onDelete: 'CASCADE' });
//# sourceMappingURL=store.js.map