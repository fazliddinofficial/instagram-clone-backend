import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { CONTROLLERS_NAMES, GqlAuthGuard, UseGuard } from '@common';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { AuthOutput } from './output/auth.output';

@Resolver(() => User)
@UseGuard()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => AuthOutput)
  [CONTROLLERS_NAMES.signUp](@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthOutput)
  [CONTROLLERS_NAMES.signIn](@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }
}
