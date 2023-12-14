import { PcCase as PcCaseM } from '~/data/models/models';
import { PriceFilter } from '~/common/types/types';
import { ComparisonDirection } from '~/common/enums/enums';

const PRICE_DEV = 20;

type Constructor = {
  PcCaseModel: typeof PcCaseM;
};

class PcCase {
  #PcCaseModel: typeof PcCaseM;

  constructor({ PcCaseModel }: Constructor) {
    this.#PcCaseModel = PcCaseModel;
  }

  getAllByPrice(filters: PriceFilter): Promise<PcCaseM[]> {
    const { amount, direction, order } = filters;

    const query = this.#PcCaseModel.query().select().castTo<PcCaseM[]>();

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

export { PcCase };
