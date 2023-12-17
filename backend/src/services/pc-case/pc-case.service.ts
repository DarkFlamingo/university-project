import { pcCase as pcCaseRep } from '~/data/repositories/repositories';
import { PriceFilter, ResponseDto } from '~/common/types/types';

type Constructor = {
  pcCaseRepository: typeof pcCaseRep;
};

class PcCase {
  #pcCaseRepository: typeof pcCaseRep;

  constructor({ pcCaseRepository }: Constructor) {
    this.#pcCaseRepository = pcCaseRepository;
  }

  async getAllCoolerByPrice(filters: PriceFilter): Promise<ResponseDto> {
    const items = await this.#pcCaseRepository.getAllByPrice(filters);

    const res = {
      'fulfillmentMessages': [
        {
          'text': {
            'text': ['PC cases upon your request'],
          },
        },
        ...items.map((item, index) => ({
          'text': {
            'text': [`${index + 1}) ${item.name} — $${item.price}`],
          },
        })),
      ],
    };

    return res;
  }
}

export { PcCase };
