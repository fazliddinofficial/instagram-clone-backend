import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';

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
