import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class Cooler extends AbstractModel {
  'name': string;

  'socketCompatibility': string[]; // List of CPU socket types it's compatible with

  'fanSizeMM': number;

  'heatPipeCount': number;

  'maxTDPWatts': number; // Maximum Thermal Design Power

  'price': number;

  static get tableName(): string {
    return TableName.COOLERS;
  }
}

export { Cooler };
