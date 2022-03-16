import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddCodeUsers extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('confirm_code').notNullable().unique()
      table.boolean('status').notNullable().defaultTo(false)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('confirm_code')
    })
  }
}
