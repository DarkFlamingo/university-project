import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class PcCase extends AbstractModel {
  'name': string;

  'coolerCount': number;

  'maxGPULength': number;

  'maxCoolerHight': number;

  'formFactor': string;

  'material': string;

  'type': string;

  'price': number;

  static get tableName(): string {
    return TableName.CASES;
  }
}

export { PcCase };
