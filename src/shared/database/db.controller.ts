import { Db, MongoClient } from 'mongodb';
import config from '../config';

class DbController {
  connection: Db;
  private client: MongoClient;

  constructor() {}

  connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.getConnectionUrl(), async (err, client) => {
        if (err) {
          reject(err);
          return;
        }
        // await client.db(database);
        this.client = client;
        this.connection = client.db(config.DB_NAME);
        resolve(client);
      });
    });
  }

  disconnect() {
    if (!this.client) return;
    return this.client.close();
  }

  private getConnectionUrl(): string {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASS } = config;
    return `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/`;
  }
}

module.exports = new DbController();
