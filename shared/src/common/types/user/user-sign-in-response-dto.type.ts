import { UserByIdResponseDto } from './user-by-id-response-dto.type';

type UserSignInResponseDto = {
  user: UserByIdResponseDto;
  token: string;
};

export { type UserSignInResponseDto };
