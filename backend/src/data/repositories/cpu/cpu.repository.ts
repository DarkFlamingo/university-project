import { AbstractRepository } from '../abstract/abstract.repository';
import { CPU as CPUM } from '~/data/models/models';
import { PriceGetAllRequestDto } from '~/common/types/types';
import { ComparisonDirection } from '~/common/enums/enums';

const PRICE_DEV = 20;

type Constructor = {
  CPUModel: typeof CPUM;
};

class CPU {
  #CPUModel: typeof CPUM;

  constructor({ CPUModel }: Constructor) {
    this.#CPUModel = CPUModel;
  }

  getAllByPrice({
    price,
    comparison,
    order,
  }: Omit<PriceGetAllRequestDto, 'componentName'>): Promise<CPUM[]> {
    const query = this.#CPUModel.query().select().castTo<CPUM[]>();

    if (price) {
      if (!comparison) {
        query
          .where('price', '>=', price - PRICE_DEV)
          .andWhere('price', '<=', price + PRICE_DEV);
      } else {
        const compDirection =
          comparison === ComparisonDirection.LESS ? '<=' : '>=';

        query.where('price', compDirection, price);
      }
    }

    if (order) {
      query.orderBy('price', order);
    }

    return query.execute();
  }
}

export { CPU };
