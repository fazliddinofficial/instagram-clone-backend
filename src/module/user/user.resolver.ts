import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CONTROLLERS_NAMES } from 'src/common/constants';
import { ID } from '@common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  [CONTROLLERS_NAMES.createUser](
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User])
  [CONTROLLERS_NAMES.getAllUsers]() {
    return this.userService.getAllDocuments();
  }

  // @Query(() => User)
  // [CONTROLLERS_NAMES.getUsersById](@Args('id') id: ID) {
  //   return this.userService.getDocumentById(id);
  // }

  @Mutation(() => User)
  [CONTROLLERS_NAMES.updateUserById](
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  // @Mutation(() => User)
  // [CONTROLLERS_NAMES.deleteUserById](@Args('userId') userId: ID) {
  //   return this.userService.delete(userId);
  // }
}
