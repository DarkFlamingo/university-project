import { CPU as CPUM } from '~/data/models/models';
import { PriceFilter } from '~/common/types/types';
import { Order } from '~/common/enums/enums';
import { ComparisonDirection } from '~/common/enums/enums';

const PRICE_DEV = 20;
const PRICE_HUGE_DEV = 50;

type Constructor = {
  CPUModel: typeof CPUM;
};

class CPU {
  #CPUModel: typeof CPUM;

  constructor({ CPUModel }: Constructor) {
    this.#CPUModel = CPUModel;
  }

  async getItemInPriceRangeOrLower(price: number): Promise<CPUM | null> {
    const cpu = await this.#CPUModel
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

  getAllByPrice(filters: PriceFilter): Promise<CPUM[]> {
    const { amount, direction, order } = filters;

    const query = this.#CPUModel.query().select().castTo<CPUM[]>();

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

export { CPU };
