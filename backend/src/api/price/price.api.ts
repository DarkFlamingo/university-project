import { FastifyPluginAsync } from 'fastify';
import {
  cpu as cpuServ,
  cooler as coolerServ,
  motherboard as motherboardServ,
  gpu as gpuServ,
  ram as ramServ,
  storage as storageServ,
  powerSupply as powerSupplyServ,
  pcCase as pcCaseServ,
} from '~/services/services';
import {
  HttpCode,
  HttpMethod,
  PriceApiPath,
  ComponentName,
} from '~/common/enums/enums';
import {
  getPriceFilterFromRequest,
  getDialogResponse,
} from '~/helpers/helpers';
import { PriceGetAllRequestDto } from '~/common/types/types';

import * as df from 'dialogflow';
import { type DetectIntentRequest } from 'dialogflow';

type Options = {
  services: {
    cpu: typeof cpuServ;
    cooler: typeof coolerServ;
    motherboard: typeof motherboardServ;
    gpu: typeof gpuServ;
    ram: typeof ramServ;
    storage: typeof storageServ;
    powerSupply: typeof powerSupplyServ;
    pcCase: typeof pcCaseServ;
  };
};

const initPriceApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const {
    cpu: cpuService,
    cooler: coolerService,
    motherboard: motherboardService,
    gpu: gpuService,
    ram: ramService,
    storage: storageService,
    pcCase: pcCaseService,
  } = opts.services;

  fastify.route({
    method: 'GET',
    url: '/get_dialogflow_agent',
    async handler(_req, rep) {
      const agentsClient = new df.AgentsClient({
        keyFilename: './test-picker-ll9r-98c1d618b8f4.json',
      });

      const res = await agentsClient.getAgent({
        parent: 'projects/test-picker-ll9r',
      });

      const [result] = res;

      return rep.send(result).status(HttpCode.OK);
    },
  });

  fastify.route<{
    Body: DetectIntentRequest;
  }>({
    method: 'POST',
    url: '/detect_intent',
    async handler(req, rep) {
      const { session, ...payload } = req.body;

      const sessionClient = new df.SessionsClient({
        keyFilename: './test-picker-ll9r-98c1d618b8f4.json',
      });
      const sessionPath = sessionClient.sessionPath(
        'test-picker-ll9r',
        session,
      );

      const res = await sessionClient.detectIntent({
        ...payload,
        outputAudioConfig: {
          audioEncoding: 'OUTPUT_AUDIO_ENCODING_LINEAR_16',
        },
        session: sessionPath,
      });

      const [result] = res;

      return rep.send(result).status(HttpCode.OK);
    },
  });

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
      const { component_name: componentNames } =
        req.body.queryResult.parameters;

      const componentName = componentNames.find((it) =>
        Object.values(ComponentName).some((name) => name === it),
      );

      let data;

      const filter = getPriceFilterFromRequest(req.body.queryResult.parameters);

      switch (componentName) {
        case ComponentName.CPU: {
          data = await cpuService.getAllCPUByPrice(filter);
          break;
        }
        case ComponentName.COOLER: {
          data = await coolerService.getAllCoolerByPrice(filter);
          break;
        }
        case ComponentName.MOTHERBOARD: {
          data = await motherboardService.getAllCoolerByPrice(filter);
          break;
        }
        case ComponentName.GPU: {
          data = await gpuService.getAllGPUByPrice(filter);
          break;
        }
        case ComponentName.RAM: {
          data = await ramService.getAllCoolerByPrice(filter);
          break;
        }
        case ComponentName.STORAGE: {
          data = await storageService.getAllCoolerByPrice(filter);
          break;
        }
        case ComponentName.POWER_SUPPLY: {
          data = await powerSupplyServ.getAllCoolerByPrice(filter);
          break;
        }
        case ComponentName.CASE: {
          data = await pcCaseService.getAllCoolerByPrice(filter);
          break;
        }
        default: {
          // eslint-disable-next-line
          console.log('Request components name: ', componentName, '\n');
          // eslint-disable-next-line
          console.log('Request: ', req.body.queryResult.parameters, '\n');
          // eslint-disable-next-line
          console.log('Filters: ', filter, '\n');

          data = getDialogResponse(
            'Unfortunately, we do not have this type of components',
          );
          break;
        }
      }

      return rep.send(JSON.stringify(data)).status(HttpCode.OK);
    },
  });
};

export { initPriceApi };
