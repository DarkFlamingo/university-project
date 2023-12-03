import { FastifyPluginAsync } from 'fastify';
import { cpu as cpuServ } from '~/services/services';
import {
  HttpCode,
  HttpMethod,
  PriceApiPath,
  ComponentName,
} from '~/common/enums/enums';
import { ResponseDto, PriceGetAllRequestDto } from '~/common/types/types';

type Options = {
  services: {
    cpu: typeof cpuServ;
  };
};

const initPriceApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { cpu: cpuService } = opts.services;

  fastify.route<{
    Body: {
      queryResult: {
        parameters: PriceGetAllRequestDto;
      };
    };
  }>({
    method: HttpMethod.POST,
    url: PriceApiPath.ROOT,
    async handler(req, rep) {
      const {
        component_name: [componentName],
        ...payload
      } = req.body.queryResult.parameters;

      let data;

      switch (componentName) {
        case ComponentName.CPU: {
          data = await cpuService.getAllCPUByPrice(payload);
          break;
        }
        case ComponentName.COOLER: {
          // data = await coolerService.getAllCooler();
          break;
        }
      }

      return rep.send(JSON.stringify(data)).status(HttpCode.OK);
    },
  });
};

export { initPriceApi };
