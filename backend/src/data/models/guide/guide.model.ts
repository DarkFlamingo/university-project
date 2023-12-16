import { TableName, ComponentName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class Guide extends AbstractModel {
  'componentName': ComponentName;

  'text': string[];

  static get tableName(): string {
    return TableName.GUIDES;
  }
}

export { Guide };
