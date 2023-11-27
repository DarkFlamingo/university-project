import {
  UserSignUpResponseDto,
  UserSignInResponseDto,
} from '~/common/types/types';

declare module 'fastify' {
  interface FastifyRequest {
    userData?: UserSignUpResponseDto | UserSignInResponseDto;
  }
}
