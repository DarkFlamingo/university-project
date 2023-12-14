import { PowerSupply as PowerSupplyM } from '~/data/models/models';
import { PriceFilter } from '~/common/types/types';
import { ComparisonDirection } from '~/common/enums/enums';

const PRICE_DEV = 20;

type Constructor = {
  PowerSupplyModel: typeof PowerSupplyM;
};

class PowerSupply {
  #PowerSupplyModel: typeof PowerSupplyM;

  constructor({ PowerSupplyModel }: Constructor) {
    this.#PowerSupplyModel = PowerSupplyModel;
  }

  getAllByPrice(filters: PriceFilter): Promise<PowerSupplyM[]> {
    const { amount, direction, order } = filters;

    const query = this.#PowerSupplyModel.query().select().castTo<PowerSupplyM[]>();

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

export { PowerSupply };
