import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class Storage extends AbstractModel {
  'name': string;

  'capacity': number;

  'interfaceType': string; // SATA, PCIe, etc.

  'readSpeed': number;

  'writeSpeed': number;

  'price': number;
  static get tableName(): string {
    return TableName.STORAGE;
  }
}

export { Storage };
