import { MutationOutput } from './../../common/dtos/output.dto';
import { User } from './../entities/user.entity';
import {
  Field,
  ObjectType,
  PickType,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountOutput extends PartialType(MutationOutput) {}
