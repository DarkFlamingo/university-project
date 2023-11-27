import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class SSD extends AbstractModel {
  'name': string;

  'storageCapacityGB': number;

  'interfaceType': string; // SATA, PCIe, etc.

  'formFactor': string;

  'readSpeedMBps': number;

  'writeSpeedMBps': number;

  'price': number;
  static get tableName(): string {
    return TableName.SSD;
  }
}

export { SSD };
