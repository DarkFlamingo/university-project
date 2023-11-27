import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { auth as authServ } from '~/services/services';
import {
  userSignUp as userSignUpValidationSchema,
  userSignIn as userSignInValidationSchema,
} from '~/validation-schemas/validation-schemas';
import {
  HttpCode,
  HttpMethod,
  AuthApiPath,
  ExceptionMessage,
} from '~/common/enums/enums';
import {
  UserSignUpRequestDto,
  UserSignInRequestDto,
} from '~/common/types/types';
import { UserError } from '~/exceptions/exceptions';

type Options = {
  services: {
    auth: typeof authServ;
  };
};

const initAuthApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { auth: authService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: AuthApiPath.ROOT,
    async handler(req, rep) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];

      const { user } = await authService.getCurrentUserData(token).catch(() => {
        throw new UserError({
          status: HttpCode.BAD_REQUEST,
          message: ExceptionMessage.INVALID_TOKEN,
        });
      });

      return rep.send(user).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.SIGN_UP,
    schema: {
      body: userSignUpValidationSchema,
    },
    async handler(req: FastifyRequest<{ Body: UserSignUpRequestDto }>, rep) {
      const userData = await authService.signUp(req.body);

      return rep.code(HttpCode.CREATED).send(userData);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.SIGN_IN,
    schema: {
      body: userSignInValidationSchema,
    },
    async handler(
      req: FastifyRequest<{ Body: UserSignInRequestDto }>,
      rep: FastifyReply,
    ) {
      const userData = await authService.signIn(req.body);

      return rep.code(HttpCode.OK).send(userData);
    },
  });
};

export { initAuthApi };
