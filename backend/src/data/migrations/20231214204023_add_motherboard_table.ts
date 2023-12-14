import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.COOLERS;

async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary({ constraintName: `${TABLE_NAME}_pkey` });

    table.text('name').notNullable();
    table.text('socket_type').notNullable();
    table.text('form_factor').notNullable();
    table.integer('max_memory_size').notNullable();
    table.integer('ram_slots').notNullable();
    table.integer('usb_ports').notNullable();
    table.float('price').notNullable();

    table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
