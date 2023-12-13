import { PriceFilter, PriceGetAllRequestDto } from '~/common/types/types';

const getPriceFilterFromRequest = (
  payload: PriceGetAllRequestDto,
): PriceFilter => {
  const [comparison] = payload.comparison ?? [null];
  const [order] = payload.order ?? [null];
  const [{ amount }] = payload['unit-currency'] ?? [{ amount: null }];

  return {
    order,
    direction: comparison,
    amount,
  };
};

export { getPriceFilterFromRequest };
