import { ComponentName } from '~/common/enums/enums';

type ComponentsAmounts = {
  [ComponentName.CPU]: number;
  [ComponentName.COOLER]: number;
  [ComponentName.MOTHERBOARD]: number;
  [ComponentName.GPU]: number;
  [ComponentName.RAM]: number;
  [ComponentName.STORAGE]: number;
  [ComponentName.POWER_SUPPLY]: number;
  [ComponentName.CASE]: number;
};

export { type ComponentsAmounts };
