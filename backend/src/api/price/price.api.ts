import * as df from 'dialogflow';
import { type DetectIntentRequest } from 'dialogflow';
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
  price as priceServ,
} from '~/services/services';

import {
  getConfigurePCFilterFromRequest,
  getPriceFilterFromRequest,
  getDialogResponse,
} from '~/helpers/helpers';

import {
  HttpCode,
  HttpMethod,
  PriceApiPath,
  ComponentName,
  WebhookAction,
} from '~/common/enums/enums';
import {
  PriceRequest,
  ResponseDto,
  ConfigurePCRequest,
} from '~/common/types/types';

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
    price: typeof priceServ;
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
    price: priceService,
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
        action: WebhookAction;
        parameters: unknown;
      };
    };
  }>({
    method: HttpMethod.POST,
    url: PriceApiPath.ROOT,
    async handler(req, rep) {
      const {
        queryResult: { action, parameters },
      } = req.body;

      // eslint-disable-next-line
      console.log('Params: ', parameters);

      switch (action) {
        case WebhookAction.PRICE_INTENT: {
          const data = await handlePriceWebhook(parameters as PriceRequest);

          return rep.code(HttpCode.OK).send(JSON.stringify(data));
        }
        case WebhookAction.CONFIGURE_PC_INTENT: {
          const data = await handleConfigurePCWebhook(
            parameters as ConfigurePCRequest,
          );

          return rep.code(HttpCode.OK).send(JSON.stringify(data));
        }
      }
    },
  });

  async function handlePriceWebhook(
    params: PriceRequest,
  ): Promise<ResponseDto> {
    const { component_name: componentNames } = params;

    const componentName = componentNames.find((it) =>
      Object.values(ComponentName).some((name) => name === it),
    );

    const filter = getPriceFilterFromRequest(params);

    switch (componentName) {
      case ComponentName.CPU: {
        return cpuService.getAllCPUByPrice(filter);
      }
      case ComponentName.COOLER: {
        return coolerService.getAllCoolerByPrice(filter);
      }
      case ComponentName.MOTHERBOARD: {
        return motherboardService.getAllCoolerByPrice(filter);
      }
      case ComponentName.GPU: {
        return gpuService.getAllGPUByPrice(filter);
      }
      case ComponentName.RAM: {
        return ramService.getAllCoolerByPrice(filter);
      }
      case ComponentName.STORAGE: {
        return storageService.getAllCoolerByPrice(filter);
      }
      case ComponentName.POWER_SUPPLY: {
        return powerSupplyServ.getAllCoolerByPrice(filter);
      }
      case ComponentName.CASE: {
        return pcCaseService.getAllCoolerByPrice(filter);
      }
      default: {
        // eslint-disable-next-line
        console.log('Request components name: ', componentName, '\n');
        // eslint-disable-next-line
        console.log('Request: ', params, '\n');
        // eslint-disable-next-line
        console.log('Filters: ', filter, '\n');

        return getDialogResponse(
          'Unfortunately, we do not have this type of components',
        );
      }
    }
  }

  async function handleConfigurePCWebhook(
    params: ConfigurePCRequest,
  ): Promise<ResponseDto> {
    const { price } = getConfigurePCFilterFromRequest(params);

    if (!price) {
      return getDialogResponse(
        'Unfortunately we could not fulfill the request, provide please specific price',
      );
    }

    return priceService.getConfiguredPcDetailsByPrice(price);
  }
};

export { initPriceApi };
