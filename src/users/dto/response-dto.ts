import { BaseResponseDto } from 'src/utils';
import { User } from '../entities/user.entity';

export class GetUserResponseDto extends BaseResponseDto {
  data: User;
}
