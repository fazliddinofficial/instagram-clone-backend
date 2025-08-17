import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/entities/user.entity';
import { SignUpInput } from './dto/sign-up.input';
import { UniquenessError } from '@common';
import { BcryptClass } from 'src/common/lib/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, fullName, nickName, password }: SignUpInput) {
    const isEmailUnique = await this.UserModel.findOne({ email });

    const isNickUnique = await this.UserModel.findOne({ nickName });

    if (!isEmailUnique) {
      throw new UniquenessError('Email');
    }

    if (!isNickUnique) {
      throw new UniquenessError('Nick name');
    }

    const createdUser = await this.UserModel.create({
      fullName,
      nickName,
      email,
      password: BcryptClass.createHash(password),
    });

    const token = this.jwtService.sign({
      email: email,
      userId: createdUser._id,
      role: createdUser.role,
    });

    return { createdUser, token };
  }
}
