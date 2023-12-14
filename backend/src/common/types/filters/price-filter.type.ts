import { Order, ComparisonDirection } from '~/common/enums/enums';

type PriceFilter = {
  order: Order | null;
  direction: ComparisonDirection | null;
  amount: number | null;
};

export { type PriceFilter };
