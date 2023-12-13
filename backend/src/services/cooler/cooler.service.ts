import { cooler as coolerRep } from '~/data/repositories/repositories';
import { PriceFilter, ResponseDto } from '~/common/types/types';

type Constructor = {
  coolerRepository: typeof coolerRep;
};

class Cooler {
  #coolerRepository: typeof coolerRep;

  constructor({ coolerRepository }: Constructor) {
    this.#coolerRepository = coolerRepository;
  }

  async getAllCoolerByPrice(filters: PriceFilter): Promise<ResponseDto> {
    const items = await this.#coolerRepository.getAllByPrice(filters);

    const res = {
      'fulfillmentMessages': [
        {
          'text': {
            'text': ['Coolers upon your request'],
          },
        },
        ...items.map((item, index) => ({
          'text': {
            'text': [`${index + 1}) ${item.name} - $${item.price}`],
          },
        })),
      ],
    };

    return res;
  }
}

export { Cooler };
