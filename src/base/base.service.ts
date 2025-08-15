import { HydratedDocument, Model, UpdateQuery } from 'mongoose';

import { DataNotFoundException, ID } from '@common';

export abstract class BaseService<
  createDto,
  updateDto extends UpdateQuery<T>,
  T,
> {
  constructor(private readonly model: Model<T>) {}
  async create(dto: createDto): Promise<HydratedDocument<T>> {
    return await this.model.create(dto);
  }

  async update(id: ID, updateDto: updateDto): Promise<HydratedDocument<T>> {
    const foundData = await this.model.findByIdAndUpdate(id, updateDto, {
      new: true,
    });

    if (!foundData) {
      throw new DataNotFoundException();
    }

    return foundData;
  }

  async delete(id: ID): Promise<HydratedDocument<T>> {
    const foundData = await this.model.findByIdAndDelete(id);

    if (!foundData) {
      throw new DataNotFoundException();
    }

    return foundData;
  }

  async getDocumentById(id: ID): Promise<HydratedDocument<T>> {
    const foundData = await this.model.findById(id);

    if (!foundData) {
      throw new DataNotFoundException();
    }

    return foundData;
  }

  async getAllDocuments(): Promise<Array<HydratedDocument<T>>> {
    return await this.model.find();
  }
}
