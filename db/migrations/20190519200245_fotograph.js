// implement changes to schema
exports.up = async function(knex, Promise) {
  return await knex.schema
    .createTable('artists', table => {
      table.string('artistId').primary()
      table.string('fname').notNullable()
      table.string('lname').defaultTo('')
      table
        .string('email')
        .notNullable()
        .unique()
      table.string('password').notNullable()
      table
        .string('avatar')
        .defaultTo(
          'https://cdn0.iconfinder.com/data/icons/faces-3/24/148-128.png'
        )
    })
    .createTable('photos', table => {
      table.increments('photoId').unsigned()
      table.string('src').notNullable()
      table.text('description').defaultTo('')
      table.string('alt').defaultTo('')
      table.integer('likes').defaultTo(0)
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table
        .string('artistId')
        .references('artists.artistId')
        // when the primary key is deleted, delete the foreign key as well
        .onDelete('CASCADE')
        // when the primary key changes, reflect those changes in foreign key
        .onUpdate('CASCADE')
    })
}

// undo changes
exports.down = async function(knex, Promise) {
  return await knex.schema.dropTable('photos').dropTable('artists')
}
