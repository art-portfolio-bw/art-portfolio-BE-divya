module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/fotograph', // postgres DB name is fotograph
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  testing: {
    client: 'pg',
    connection: 'postgres://localhost/test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
}
