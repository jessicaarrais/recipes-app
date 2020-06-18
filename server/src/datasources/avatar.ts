import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { createWriteStream, unlink, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { Context } from '..';
import { dbAvatar, db } from '../store';
import { AvatarGQL } from '../schema';

class Avatar extends DataSource {
  context: Context;

  initialize(config: DataSourceConfig<Context>): void | Promise<void> {
    this.context = config.context;
  }

  async uploadAvatar({ file }): Promise<AvatarGQL> {
    await db.sync();
    try {
      const { filename, mimetype, encoding, createReadStream } = await file;
      const avatar = await dbAvatar.findOrCreate({
        where: { userId: this.context.user.id },
      });
      const newAvatar = avatar[0];
      if (newAvatar) {
        await newAvatar.update({
          filename,
          mimetype,
          filesize: 1,
          encoding,
        });
      }

      existsSync(path.join(__dirname, '../../images')) ||
        mkdirSync(path.join(__dirname, '../../images'));

      const stream = createReadStream();
      const imgPath = path.join(__dirname, '../../images', filename);

      await new Promise((resolve, reject) => {
        const writeStream = createWriteStream(imgPath);
        writeStream.on('finish', resolve);
        writeStream.on('error', (error) => {
          unlink(imgPath, () => {
            reject(error);
          });
        });
        stream.on('error', (error) => writeStream.destroy(error));
        stream.pipe(writeStream);
      });

      return {
        id: newAvatar.id,
        userId: newAvatar.userId,
        filename: newAvatar.filename,
        mimetype: newAvatar.mimetype,
        filesize: newAvatar.filesize,
        encoding: newAvatar.encoding,
      };
    } catch (error) {
      console.log(error);

      throw new Error(error.errors[0].message);
    }
  }

  async getAvatar(userId): Promise<AvatarGQL> {
    return await dbAvatar.findOne({ where: { userId } });
  }
}

export default Avatar;
