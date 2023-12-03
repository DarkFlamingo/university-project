import { cpu as cpuRep } from '~/data/repositories/repositories';
import { PriceGetAllRequestDto, ResponseDto } from '~/common/types/types';

type Constructor = {
  cpuRepository: typeof cpuRep;
};

class CPU {
  #cpuRepository: typeof cpuRep;

  constructor({ cpuRepository }: Constructor) {
    this.#cpuRepository = cpuRepository;
  }

  async getAllCPUByPrice(
    filters: Omit<PriceGetAllRequestDto, 'component_name'>,
  ): Promise<any> {
    const items = await this.#cpuRepository.getAllByPrice(filters);

    // eslint-disable-next-line
    console.log('Items: ', items);

    return {
      'fulfillmentMessages': [
        {
          'text': {
            'text': [
              'Header, Next line, Next line, Next line, Next line, Next line, Next line, Next line, Next line',
            ],
          },
        },
        ...items.map((item, index) => ({
          'text': {
            'text': [`${index + 1}) ${item.name} - $${item.price}`],
          },
        })),
      ],
    };
  }
}

export { CPU };
