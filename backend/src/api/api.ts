import { FastifyPluginAsync } from 'fastify';
import { ApiPath } from '~/common/enums/enums';
import { ValidationSchema } from '~/common/types/types';
import {
  auth,
  cpu,
  cooler,
  motherboard,
  gpu,
  ram,
  storage,
  powerSupply,
  pcCase,
  price,
  guide,
} from '~/services/services';
import { initAuthApi } from './auth/auth';
import { initPriceApi } from './price/price.api';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.setValidatorCompiler<ValidationSchema>(({ schema }) => {
    return <T>(data: T): ReturnType<ValidationSchema['validate']> => {
      return schema.validate(data);
    };
  });

  fastify.register(initAuthApi, {
    services: {
      auth,
    },
    prefix: ApiPath.AUTH,
  });

  fastify.register(initPriceApi, {
    services: {
      cpu,
      cooler,
      motherboard,
      gpu,
      ram,
      storage,
      powerSupply,
      pcCase,
      price,
      guide,
    },
    prefix: ApiPath.PRICE,
  });
};

export { initApi };
