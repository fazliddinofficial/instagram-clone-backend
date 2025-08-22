import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { CONTROLLERS_NAMES, GqlAuthGuard, IContext, RolesGuard } from '@common';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { AuthOutput } from './output/auth.output';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(RolesGuard)
  @Mutation(() => AuthOutput)
  [CONTROLLERS_NAMES.signUp](
    @Args('signUpInput') signUpInput: SignUpInput,
    @Context() context: IContext,
  ) {
    return this.authService.signUp(signUpInput);
  }

  @UseGuards(RolesGuard)
  @Mutation(() => AuthOutput)
  [CONTROLLERS_NAMES.signIn](@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }
}
