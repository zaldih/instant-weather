import {
  Collection,
  Filter,
  UpdateOptions,
  Document,
  FindOptions,
  InsertOneResult,
  UpdateResult,
  WithId,
  OptionalUnlessRequiredId,
} from 'mongodb';
import db from './db.controller';

export abstract class BaseRepository<T extends Document> {
  protected collection: Collection<T>;

  constructor(collectionName: string) {
    this.collection = db.connection.collection<T>(collectionName);
  }

  async insertOne(
    item: OptionalUnlessRequiredId<T>,
  ): Promise<InsertOneResult<T>> {
    try {
      const res = await this.collection.insertOne(item);
      return res;
    } catch (err) {
      throw err;
    }
  }

  async updateOne(
    where: Filter<T>,
    set: Partial<T>,
    options?: UpdateOptions,
  ): Promise<UpdateResult> {
    try {
      const res = await this.collection.updateOne(
        where,
        { $set: set },
        options,
      );
      return res;
    } catch (err) {
      throw err;
    }
  }

  async findOne(
    query: Filter<T>,
    options?: FindOptions<T>,
  ): Promise<WithId<T> | null> {
    try {
      const result = await this.collection.findOne(query, options);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
