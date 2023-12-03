import {
  ComparisonDirection,
  Order,
  ComponentName,
} from '~/common/enums/enums';

type PriceGetAllRequestDto = {
  price: number;
  comparison: ComparisonDirection | null;
  order: Order | null;
  componentName: ComponentName;
};

export { type PriceGetAllRequestDto };
