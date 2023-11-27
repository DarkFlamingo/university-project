import { Model } from 'objection';
import { getFormattedISODate } from '~/helpers/helpers';

class AbstractModel extends Model {
  'id': string;

  'createdAt': string;

  $beforeInsert(): void {
    const date = getFormattedISODate(new Date());

    this.createdAt = date;
  }
}

export { AbstractModel };
