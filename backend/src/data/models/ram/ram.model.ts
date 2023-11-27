import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class RAM extends AbstractModel {
  'name': string;

  'typeDDR': string; // роз'єм процесора 

  'form': string;

  'frequency': number;
  
  'size': number;

  'price': number;

  static get tableName(): string {
    return TableName.RAM;
  }
}

export { RAM };
