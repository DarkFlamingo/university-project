import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class GraphicsCard extends AbstractModel {
  'name': string;

  'chipset': string;

  'memoryGB': number;

  'memoryType': string;

  'coreClockMHz': number;

  'boostClockMHz': number;

  'price': number;

  static get tableName(): string {
    return TableName.GRAPHICS_CARDS;
  }
}

export { GraphicsCard };
