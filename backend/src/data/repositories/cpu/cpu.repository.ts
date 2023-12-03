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

  getAllByPrice(
    payload: Omit<PriceGetAllRequestDto, 'component_name'>,
  ): Promise<CPUM[]> {
    const query = this.#CPUModel.query().select().castTo<CPUM[]>();

    if (payload['unit-currency']) {
      const [{ amount: price }] = payload['unit-currency'];

      if (!payload.comparison) {
        query
          .where('price', '>=', price - PRICE_DEV)
          .andWhere('price', '<=', price + PRICE_DEV);
      } else {
        const [comparison] = payload.comparison;
        const compDirection =
          comparison === ComparisonDirection.LESS ? '<=' : '>=';

        query.where('price', compDirection, price);
      }
    }

    if (payload.order) {
      const [order] = payload.order;
      query.orderBy('price', order);
    }

    return query.execute();
  }
}

export { CPU };
