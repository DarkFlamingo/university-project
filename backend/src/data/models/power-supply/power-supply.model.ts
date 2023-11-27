import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class PowerSupply extends AbstractModel {
  'name': string;

  'wattage': number;

  'efficiencyRating': string;

  'modularType': string; // Fully modular, semi-modular, non-modular

  'price': number;

  static get tableName(): string {
    return TableName.POWER_SUPPLIES;
  }
}

export { PowerSupply };
