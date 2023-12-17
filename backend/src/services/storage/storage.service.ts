import { storage as storageRep } from '~/data/repositories/repositories';
import { PriceFilter, ResponseDto } from '~/common/types/types';

type Constructor = {
  storageRepository: typeof storageRep;
};

class Storage {
  #storageRepository: typeof storageRep;

  constructor({ storageRepository }: Constructor) {
    this.#storageRepository = storageRepository;
  }

  async getAllCoolerByPrice(filters: PriceFilter): Promise<ResponseDto> {
    const items = await this.#storageRepository.getAllByPrice(filters);

    const res = {
      'fulfillmentMessages': [
        {
          'text': {
            'text': ['Storages upon your request'],
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

export { Storage };
