import { GPU as GPUM } from '~/data/models/models';
import { PriceFilter } from '~/common/types/types';
import { ComparisonDirection } from '~/common/enums/enums';

const PRICE_DEV = 20;

type Constructor = {
  GPUModel: typeof GPUM;
};

class GPU {
  #GPUModel: typeof GPUM;

  constructor({ GPUModel }: Constructor) {
    this.#GPUModel = GPUModel;
  }

  getAllByPrice(filters: PriceFilter): Promise<GPUM[]> {
    const { amount, direction, order } = filters;

    const query = this.#GPUModel.query().select().castTo<GPUM[]>();

    if (amount !== null) {
      if (!direction) {
        query
          .where('price', '>=', amount - PRICE_DEV)
          .andWhere('price', '<=', amount + PRICE_DEV);
      } else {
        const compDirection =
          direction === ComparisonDirection.LESS ? '<=' : '>=';

        query.where('price', compDirection, amount);
      }
    }

    if (order) {
      query.orderBy('price', order);
    }

    return query.execute();
  }
}

export { GPU };
