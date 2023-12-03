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
  ): Promise<ResponseDto> {
    const items = await this.#cpuRepository.getAllByPrice(filters);

    // eslint-disable-next-line
    console.log('Items: ', items);

    return {
      'fulfillmentMessages': [
        {
          'text': {
            'text': ['Text response from webhook'],
          },
        },
      ],
    };
  }
}

export { CPU };
