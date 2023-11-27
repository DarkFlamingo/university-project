import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';

class User extends AbstractModel {
  'email': string;

  'passwordHash': string;

  'passwordSalt': string;

  'firstname': string;

  'lastname': string;

  static get tableName(): string {
    return TableName.USERS;
  }
}

export { User };
