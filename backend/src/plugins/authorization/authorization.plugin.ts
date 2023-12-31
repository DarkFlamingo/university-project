import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { ControllerHook, ExceptionMessage } from '~/common/enums/enums';
import { UserError } from '~/exceptions/exceptions';
import { auth as authServ } from '~/services/services';

type Options = {
  whiteRoutes: string[];
  services: {
    auth: typeof authServ;
  };
};

const authorization: FastifyPluginAsync<Options> = fp(async (fastify, opts) => {
  const { whiteRoutes, services } = opts;
  const { auth } = services;

  fastify.addHook(ControllerHook.ON_REQUEST, async (request) => {
    const isWhiteRoute = whiteRoutes.some(
      (route) => route === request.routerPath,
    );
    if (isWhiteRoute) {
      return;
    }

    const [, token] = request.headers?.authorization?.split(' ') ?? [];
    if (!token) {
      throw new UserError({
        message: ExceptionMessage.UNAUTHORIZED_USER,
      });
    }

    request.userData = await auth.getCurrentUserData(token);
  });
});

export { authorization };
