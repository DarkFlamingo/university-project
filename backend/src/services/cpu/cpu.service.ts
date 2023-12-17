import { cpu as cpuRep } from '~/data/repositories/repositories';
import { PriceFilter, ResponseDto } from '~/common/types/types';

type Constructor = {
  cpuRepository: typeof cpuRep;
};

class CPU {
  #cpuRepository: typeof cpuRep;

  constructor({ cpuRepository }: Constructor) {
    this.#cpuRepository = cpuRepository;
  }

  async getAllCPUByPrice(filters: PriceFilter): Promise<ResponseDto> {
    const items = await this.#cpuRepository.getAllByPrice(filters);

    const res = {
      'fulfillmentMessages': [
        {
          'text': {
            'text': ['CPUs upon your request: '],
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

export { CPU };
