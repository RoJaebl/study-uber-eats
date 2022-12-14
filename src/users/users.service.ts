import { LoginInput, LoginOutput } from './dtos/login.dto';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }
  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    // find ther user with the email
    // check if the passowrd is correct
    // make JWT and give it to the user
    try {
      const user = await this.users.findOne({ where: { email } });
      if (!user) {
        return { ok: false, error: 'User not found' };
      }
      const passowrdCorrect = await user.checkPassword(password);
      if (!passowrdCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      return {
        ok: true,
        token: 'adfasdf',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  // async createAccount({
  //   email,
  //   password,
  //   role,
  // }: CreateAccountInput): Promise<[boolean, string?]> {
  //   try {
  //     const exists = await this.users.findOne({ where: { email } });
  //     if (exists) {
  //       return [false, 'There is a user with that email already'];
  //     }
  //     await this.users.save(this.users.create({ email, password, role }));
  //     return [true];
  //   } catch (e) {
  //     return [false, "Couldn't create account"];
  //   }
  // }
}
