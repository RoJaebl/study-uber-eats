import { LoginOutput, LoginInput } from './dtos/login.dto';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Args, Query, Resolver, Mutation, Context } from '@nestjs/graphql';
import { PossibleTypeExtensionsRule } from 'graphql';
import e from 'express';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}
  @Query((types) => Boolean)
  sayHi() { 
    return true;
  }
  @Mutation((resturns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      return this.userService.createAccount(createAccountInput);
    } catch (error) {
      return { ok: false, error };
    }
  }
  @Mutation((returns) => LoginOutput)
  async logIn(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return this.userService.login(loginInput);
    } catch (error) {
      return { ok: false, error };
    }
  }
  @Query((returns) => Boolean)
  me(@Context() context) {
    if(!context.user){
      return;
    }else{
      return context.user;
    }
  }
}
