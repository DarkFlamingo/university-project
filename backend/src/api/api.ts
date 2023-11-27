import { FastifyPluginAsync } from 'fastify';
import { ApiPath } from '~/common/enums/enums';
import { ValidationSchema } from '~/common/types/types';
import { WHITE_ROUTES } from '~/common/constants/constants';
import { auth } from '~/services/services';
import { initAuthApi } from './auth/auth';
import { authorization as authorizationPlugin } from '~/plugins/plugins';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.setValidatorCompiler<ValidationSchema>(({ schema }) => {
    return <T>(data: T): ReturnType<ValidationSchema['validate']> => {
      return schema.validate(data);
    };
  });

  fastify.register(authorizationPlugin, {
    services: {
      auth,
    },
    whiteRoutes: WHITE_ROUTES,
  });

  fastify.register(initAuthApi, {
    services: {
      auth,
    },
    prefix: ApiPath.AUTH,
  });
};

export { initApi };
