import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

export const environment = {
  production: false,
  type: 'mongodb' as MongoConnectionOptions['type'],
  url: 'mongodb+srv://admin:admin1234@cluster0.fqetq.mongodb.net/mydb?retryWrites=true&w=majority',
  database: 'cr-db',
  assetPath: './assets/files',
};
