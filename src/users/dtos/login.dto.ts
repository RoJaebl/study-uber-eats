import { User } from './../entities/user.entity';
import {
  Field,
  ObjectType,
  PartialType,
  InputType,
  PickType,
} from '@nestjs/graphql';
import { MutationOutput } from './../../common/dtos/output.dto';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends PartialType(MutationOutput) {
  @Field((type) => String, { nullable: true })
  token?: string;
}
