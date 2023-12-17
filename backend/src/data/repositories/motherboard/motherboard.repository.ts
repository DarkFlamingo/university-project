import { Motherboard as MotherboardM } from '~/data/models/models';
import { PriceFilter } from '~/common/types/types';
import { ComparisonDirection, Order } from '~/common/enums/enums';

const PRICE_DEV = 20;
const PRICE_HUGE_DEV = 50;

type Constructor = {
  MotherboardModel: typeof MotherboardM;
};

class Motherboard {
  #MotherboardModel: typeof MotherboardM;

  constructor({ MotherboardModel }: Constructor) {
    this.#MotherboardModel = MotherboardModel;
  }

  async getItemInPriceRangeOrLower(
    price: number,
  ): Promise<MotherboardM | null> {
    const cpu = await this.#MotherboardModel
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

  getAllByPrice(filters: PriceFilter): Promise<MotherboardM[]> {
    const { amount, direction, order } = filters;

    const query = this.#MotherboardModel
      .query()
      .select()
      .castTo<MotherboardM[]>();

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

export { Motherboard };
