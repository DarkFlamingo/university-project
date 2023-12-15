import { ConfigurePCRequest, ConfigurePCFilter } from '~/common/types/types';

const getConfigurePCFilterFromRequest = (
  payload: ConfigurePCRequest,
): ConfigurePCFilter => {
  const { amount } = payload['unit-currency'] ?? { amount: null };

  return {
    price: amount,
  };
};

export { getConfigurePCFilterFromRequest };
