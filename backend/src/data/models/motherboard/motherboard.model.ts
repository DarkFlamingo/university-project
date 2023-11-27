import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class Motherboard extends AbstractModel {
  'name': string;

  'socketType': string; // CPU socket type

  'formFactor': string;

  'maxMemorySizeGB': number;

  'ramSlots': number;

  'usbPorts': number;

  'price': number;

  static get tableName(): string {
    return TableName.MOTHERBOARDS;
  }
}

export { Motherboard };
