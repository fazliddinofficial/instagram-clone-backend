import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { DataNotFoundException, MessageError, UniquenessError } from '@common';
import { User } from '../user/entities/user.entity';
import { SignUpInput } from './dto/sign-up.input';
import { BcryptClass } from 'src/common/lib/bcrypt';
import { SignInInput } from './dto/sign-in.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp({
    email,
    fullName,
    nickName,
    password,
  }: SignUpInput): Promise<{ user: User; token: string }> {
    const isEmailUnique = await this.UserModel.findOne({ email });

    const isNickUnique = await this.UserModel.findOne({ nickName });

    if (isEmailUnique) {
      throw new UniquenessError('Email');
    }

    if (isNickUnique) {
      throw new UniquenessError('Nick name');
    }

    const hashedPassword = await BcryptClass.createHash(password);

    const createdUser = await this.UserModel.create({
      fullName,
      nickName,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({
      email: email,
      userId: createdUser._id,
      role: createdUser.role,
    });

    return { user: createdUser, token };
  }

  async signIn({
    nickName,
    password,
  }: SignInInput): Promise<{ user: User; token: string }> {
    const foundUser = await this.UserModel.findOne({ nickName });

    if (!foundUser) {
      throw new DataNotFoundException();
    }

    const isPasswordCorrect = BcryptClass.compareHash(
      password,
      foundUser.password,
    );

    if (!isPasswordCorrect) {
      throw new MessageError('Password is not correct');
    }

    const token = this.jwtService.sign({
      email: foundUser.email,
      userId: foundUser._id,
      role: foundUser.role,
    });

    return { user: foundUser, token };
  }
}
