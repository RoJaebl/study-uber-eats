import { CreateRestaurantDto } from './create-restaurant.dto';
import {
  InputType,
  PartialType,
  Field,
  PickType,
  ArgsType,
} from '@nestjs/graphql';

@InputType()
class UpdateRestaurantInputType extends PartialType(
  CreateRestaurantDto,
  InputType,
) {}

@InputType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
