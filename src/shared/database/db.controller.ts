import { Db, MongoClient } from 'mongodb';
import config from '../config';

class DbController {
  public connection!: Db;
  private client!: MongoClient;

  constructor() {}

  async connect(): Promise<MongoClient> {
    try {
      const connectionUrl = this.getConnectionUrl();
      this.client = await MongoClient.connect(connectionUrl);
      this.connection = this.client.db(config.DB_NAME);
      console.log('Successfully connected to MongoDB!');
      return this.client;
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client && this.client.close) {
      await this.client.close();
      console.log('Disconnected from MongoDB.');
    } else {
      console.warn('MongoDB client was not initialized or already closed.');
    }
  }

  private getConnectionUrl(): string {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = config;

    if (DB_USER && DB_PASS) {
      return `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    }
    return `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }
}

export default new DbController();
