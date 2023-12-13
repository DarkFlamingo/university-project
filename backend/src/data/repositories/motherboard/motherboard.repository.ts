import { Motherboard as MotherboardM } from '~/data/models/models';
import { PriceFilter } from '~/common/types/types';
import { ComparisonDirection } from '~/common/enums/enums';

const PRICE_DEV = 20;

type Constructor = {
  MotherboardModel: typeof MotherboardM;
};

class Motherboard {
  #MotherboardModel: typeof MotherboardM;

  constructor({ MotherboardModel }: Constructor) {
    this.#MotherboardModel = MotherboardModel;
  }

  getAllByPrice(filters: PriceFilter): Promise<MotherboardM[]> {
    const { amount, direction, order } = filters;

    const query = this.#MotherboardModel.query().select().castTo<MotherboardM[]>();

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

export { Motherboard };
