import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { CONTROLLERS_NAMES } from '@common';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => User)
  [CONTROLLERS_NAMES.signUp](@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => User)
  [CONTROLLERS_NAMES.signIn](@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }
}
