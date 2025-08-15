import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { BaseService } from '@common';

@Injectable()
export class UserService extends BaseService<
  CreateUserInput,
  UpdateUserInput,
  User
> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }
  async create(createUserInput: CreateUserInput) {
    return await this.userModel.create(createUserInput);
  }
}
