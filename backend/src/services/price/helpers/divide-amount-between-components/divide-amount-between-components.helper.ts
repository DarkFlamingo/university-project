import { ComponentsAmounts } from '~/common/types/types';
import { ComponentName } from '~/common/enums/enums';

const mapComponentNameToCf = {
  [ComponentName.CPU]: 0.2,
  [ComponentName.COOLER]: 0.1,
  [ComponentName.MOTHERBOARD]: 0.2,
  [ComponentName.GPU]: 0.1,
  [ComponentName.RAM]: 0.2,
  [ComponentName.STORAGE]: 0.1,
  [ComponentName.POWER_SUPPLY]: 0.05,
  [ComponentName.CASE]: 0.05,
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
