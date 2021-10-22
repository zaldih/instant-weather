import { Collection } from 'mongodb';
const db = require('./db.controller');
export abstract class BaseRepository<T> {
  protected collection: Collection;

  constructor(collectionName: string) {
    this.collection = db.connection.collection(collectionName);
  }

  insertOne(item: T) {
    return new Promise((resolve, reject) => {
      this.collection.insertOne(item, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  findOne(query: any = {}) {
    return new Promise((resolve, reject) => {
      this.collection.findOne(query, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}
