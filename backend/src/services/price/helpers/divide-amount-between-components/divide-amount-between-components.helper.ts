import { ComponentsAmounts } from '~/common/types/types';
import { ComponentName } from '~/common/enums/enums';

const mapComponentNameToCf = {
  [ComponentName.CPU]: 0.17,
  [ComponentName.COOLER]: 0.03,
  [ComponentName.MOTHERBOARD]: 0.14,
  [ComponentName.GPU]: 0.35,
  [ComponentName.RAM]: 0.1,
  [ComponentName.STORAGE]: 0.08,
  [ComponentName.POWER_SUPPLY]: 0.1,
  [ComponentName.CASE]: 0.03,
};

const divideAmountBetweenComponents = (amount: number): ComponentsAmounts => {
  return {
    [ComponentName.CPU]: amount * mapComponentNameToCf[ComponentName.CPU],
    [ComponentName.COOLER]: amount * mapComponentNameToCf[ComponentName.COOLER],
    [ComponentName.MOTHERBOARD]:
      amount * mapComponentNameToCf[ComponentName.MOTHERBOARD],
    [ComponentName.GPU]: amount * mapComponentNameToCf[ComponentName.GPU],
    [ComponentName.RAM]: amount * mapComponentNameToCf[ComponentName.RAM],
    [ComponentName.STORAGE]:
      amount * mapComponentNameToCf[ComponentName.STORAGE],
    [ComponentName.POWER_SUPPLY]:
      amount * mapComponentNameToCf[ComponentName.POWER_SUPPLY],
    [ComponentName.CASE]: amount * mapComponentNameToCf[ComponentName.CASE],
  };
};

export { divideAmountBetweenComponents };
