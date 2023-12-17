import { powerSupply as powerSupplyRep } from '~/data/repositories/repositories';
import { PriceFilter, ResponseDto } from '~/common/types/types';

type Constructor = {
  powerSupplyRepository: typeof powerSupplyRep;
};

class PowerSupply {
  #powerSupplyRepository: typeof powerSupplyRep;

  constructor({ powerSupplyRepository }: Constructor) {
    this.#powerSupplyRepository = powerSupplyRepository;
  }

  async getAllCoolerByPrice(filters: PriceFilter): Promise<ResponseDto> {
    const items = await this.#powerSupplyRepository.getAllByPrice(filters);

    const res = {
      'fulfillmentMessages': [
        {
          'text': {
            'text': ['Power supplies upon your request'],
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

export { PowerSupply };
