import {
  ComparisonDirection,
  Order,
  ComponentName,
} from '~/common/enums/enums';

type PriceRequest = {
  ['unit-currency']: [
    {
      amount: number;
      currency: string;
    },
  ];
  comparison: [ComparisonDirection] | null;
  order: [Order] | null;
  component_name: [ComponentName];
};

export { type PriceRequest };
