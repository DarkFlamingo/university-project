import { Storage as StorageM } from '~/data/models/models';
import { PriceFilter } from '~/common/types/types';
import { ComparisonDirection } from '~/common/enums/enums';

const PRICE_DEV = 20;

type Constructor = {
  StorageModel: typeof StorageM;
};

class Storage {
  #StorageModel: typeof StorageM;

  constructor({ StorageModel }: Constructor) {
    this.#StorageModel = StorageModel;
  }

  getAllByPrice(filters: PriceFilter): Promise<StorageM[]> {
    const { amount, direction, order } = filters;

    const query = this.#StorageModel.query().select().castTo<StorageM[]>();

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

export { Storage };
