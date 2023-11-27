import { UserByIdResponseDto } from './user-by-id-response-dto.type';

type UserSignUpResponseDto = {
  user: UserByIdResponseDto;
  token: string;
};

export { type UserSignUpResponseDto };
