import { FastifyPluginAsync } from 'fastify';
import { cpu as cpuServ } from '~/services/services';
import {
  HttpCode,
  HttpMethod,
  PriceApiPath,
  ComponentName,
} from '~/common/enums/enums';
import { PriceGetAllRequestDto } from '~/common/types/types';

import * as df from 'dialogflow';
import { type DetectIntentRequest } from 'dialogflow';

type Options = {
  services: {
    cpu: typeof cpuServ;
  };
};

const initPriceApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { cpu: cpuService } = opts.services;

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
          break;
        }
      }

      return rep.send(JSON.stringify(data)).status(HttpCode.OK);
    },
  });
};

export { initPriceApi };
