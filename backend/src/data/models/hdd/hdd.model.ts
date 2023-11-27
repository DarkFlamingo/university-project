import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class HDD extends AbstractModel {
  'name': string;

  'storageCapacityGB': number;

  'interfaceType': string; // SATA, etc.

  'rotationSpeedRPM': number;

  'cacheMB': number;

  'price': number;

  static get tableName(): string {
    return TableName.HDD;
  }
}

export { HDD };
