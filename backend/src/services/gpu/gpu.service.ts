import { gpu as gpuRep } from '~/data/repositories/repositories';
import { PriceFilter, ResponseDto } from '~/common/types/types';

type Constructor = {
  gpuRepository: typeof gpuRep;
};

class GPU {
  #gpuRepository: typeof gpuRep;

  constructor({ gpuRepository }: Constructor) {
    this.#gpuRepository = gpuRepository;
  }

  async getAllGPUByPrice(filters: PriceFilter): Promise<ResponseDto> {
    const items = await this.#gpuRepository.getAllByPrice(filters);

    const res = {
      'fulfillmentMessages': [
        {
          'text': {
            'text': ['GPUs upon your request: '],
          },
        },
        ...items.map((item, index) => ({
          'text': {
            'text': [`${index + 1}) ${item.name} – $${item.price}`],
          },
        })),
      ],
    };

    return res;
  }
}

export { GPU };
