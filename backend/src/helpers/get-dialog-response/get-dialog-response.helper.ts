import { ResponseDto } from '~/common/types/types';

const getDialogResponse = (...messages: string[]): ResponseDto => {
  return {
    'fulfillmentMessages': messages.map((message) => ({
      'text': {
        'text': [message],
      },
    })),
  };
};

export { getDialogResponse };
