import { ram as ramRep } from '~/data/repositories/repositories';
import { PriceFilter, ResponseDto } from '~/common/types/types';

type Constructor = {
  ramRepository: typeof ramRep;
};

class RAM {
  #ramRepository: typeof ramRep;

  constructor({ ramRepository }: Constructor) {
    this.#ramRepository = ramRepository;
  }

  async getAllCoolerByPrice(filters: PriceFilter): Promise<ResponseDto> {
    const items = await this.#ramRepository.getAllByPrice(filters);

    const res = {
      'fulfillmentMessages': [
        {
          'text': {
            'text': ['RAMs upon your request'],
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

export { RAM };
