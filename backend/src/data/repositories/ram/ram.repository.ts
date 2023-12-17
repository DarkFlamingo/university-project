import { RAM as RAMM } from '~/data/models/models';
import { PriceFilter } from '~/common/types/types';
import { ComparisonDirection, Order } from '~/common/enums/enums';

const PRICE_DEV = 20;
const PRICE_HUGE_DEV = 50;

type Constructor = {
  RAMModel: typeof RAMM;
};

class RAM {
  #RAMModel: typeof RAMM;

  constructor({ RAMModel }: Constructor) {
    this.#RAMModel = RAMModel;
  }

  async getItemInPriceRangeOrLower(price: number): Promise<RAMM | null> {
    const cpu = await this.#RAMModel
      .query()
      .select()
      .where('price', '<=', price + PRICE_HUGE_DEV)
      .orderBy('price', Order.DESC)
      .first();

    if (!cpu) {
      return null;
    }

    return cpu;
  }

  getAllByPrice(filters: PriceFilter): Promise<RAMM[]> {
    const { amount, direction, order } = filters;

    const query = this.#RAMModel.query().select().castTo<RAMM[]>();

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

    return query.limit(10).execute();
  }
}

export { RAM };
