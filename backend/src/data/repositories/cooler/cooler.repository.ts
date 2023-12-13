import { Cooler as CoolerM } from '~/data/models/models';
import { PriceFilter } from '~/common/types/types';
import { ComparisonDirection } from '~/common/enums/enums';

const PRICE_DEV = 20;

type Constructor = {
  CoolerModel: typeof CoolerM;
};

class Cooler {
  #CoolerModel: typeof CoolerM;

  constructor({ CoolerModel }: Constructor) {
    this.#CoolerModel = CoolerModel;
  }

  getAllByPrice(filters: PriceFilter): Promise<CoolerM[]> {
    const { amount, direction, order } = filters;

    const query = this.#CoolerModel.query().select().castTo<CoolerM[]>();

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

export { Cooler };
