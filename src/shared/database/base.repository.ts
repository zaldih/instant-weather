import { Collection, Filter, UpdateOptions, Document } from 'mongodb';
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

  updateOne(where: Partial<T>, set: Partial<T>, options: UpdateOptions) {
    return new Promise((resolve, reject) => {
      this.collection.updateOne(where, { $set: set }, options, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  findOne(query: Filter<Document>) {
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
