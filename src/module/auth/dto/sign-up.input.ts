import { PASSWORD_MIN_LENGTH } from '@common';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

@InputType()
@ArgsType()
export class SignUpInput {
  @IsString()
  @Field(() => String)
  fullName: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String)
  @IsStrongPassword({ minLength: PASSWORD_MIN_LENGTH })
  password: string;

  @Field(() => String)
  nickName: string;
}
