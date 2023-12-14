import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class GPU extends AbstractModel {
  'name': string;

  'chipset': string;

  'memory': number;

  'memoryType': string;

  'coreClock': number;

  'boostClock': number;

  'price': number;

  static get tableName(): string {
    return TableName.GRAPHICS_CARDS;
  }
}

export { GPU };
