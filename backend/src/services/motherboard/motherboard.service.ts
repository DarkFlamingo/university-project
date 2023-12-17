import { motherboard as motherboardRep } from '~/data/repositories/repositories';
import { PriceFilter, ResponseDto } from '~/common/types/types';

type Constructor = {
  motherboardRepository: typeof motherboardRep;
};

class Motherboard {
  #motherboardRepository: typeof motherboardRep;

  constructor({ motherboardRepository }: Constructor) {
    this.#motherboardRepository = motherboardRepository;
  }

  async getAllCoolerByPrice(filters: PriceFilter): Promise<ResponseDto> {
    const items = await this.#motherboardRepository.getAllByPrice(filters);

    const res = {
      'fulfillmentMessages': [
        {
          'text': {
            'text': ['Motherboards upon your request'],
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

export { Motherboard };
