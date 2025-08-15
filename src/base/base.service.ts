import { Model, UpdateQuery } from 'mongoose';

import { DataNotFoundException, ID } from '@common';

export abstract class BaseService<
  createDto,
  updateDto extends UpdateQuery<T>,
  T,
> {
  constructor(private readonly model: Model<T>) {}
  async create(dto: createDto) {
    return await this.model.create(dto);
  }

  async update(id: ID, updateDto: updateDto) {
    return await this.model.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async delete(id: ID) {
    const foundData = await this.model.findByIdAndDelete(id);

    if (!foundData) {
      throw new DataNotFoundException();
    }
  }
}
