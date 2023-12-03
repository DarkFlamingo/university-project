import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class CPU extends AbstractModel {
  'name': string;

  'socketType': string; // CPU socket type, should match with the motherboard's socket type

  'cores': number;

  'threads': number;

  'clockSpeed': number;

  'TDP': number;

  'price': number;

  static get tableName(): string {
    return TableName.CPU;
  }
}

export { CPU };
