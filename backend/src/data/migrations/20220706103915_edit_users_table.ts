import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.USERS;

async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, function (table) {
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn('firstname');
    table.dropColumn('lastname');
  });
}

export { up, down };
