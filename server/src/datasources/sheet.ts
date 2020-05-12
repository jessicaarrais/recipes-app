import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { dbSheet, SheetStatic, SheetModel } from '../store';
import { Context } from '..';
import { SheetGQL } from '../schema';

interface NewSheet {
  title: string;
  notebookId: number;
}

interface UpdatedSheet {
  title: string;
}

class Sheet extends DataSource {
  dbSheet: SheetStatic;
  context: Context;

  constructor() {
    super();
    this.dbSheet = dbSheet;
  }

  initialize(config: DataSourceConfig<any>): void | Promise<void> {
    this.context = config.context;
  }

  async getSheets(notebookId: number): Promise<Array<SheetGQL>> {
    return await this.dbSheet
      .findAll({
        where: { notebookId },
      })
      .map(async (sheet) => {
        return {
          id: sheet.id,
          notebookId: sheet.notebookId,
          title: sheet.title,
          sheet: await this.context.dataSources.todoAPI.getTodos(sheet.id),
        };
      });
  }

  async createSheet({ title, notebookId }: NewSheet): Promise<SheetModel> {
    return await this.dbSheet.create({
      title,
      notebookId,
    });
  }

  async updateSheet(
    updatedSheet: UpdatedSheet,
    sheetId: number
  ): Promise<Array<any>> {
    return this.dbSheet.update(updatedSheet, { where: { id: sheetId } });
  }

  async deleteSheet(sheetId: number): Promise<number> {
    return await this.dbSheet.destroy({ where: { id: sheetId } });
  }
}

export default Sheet;
