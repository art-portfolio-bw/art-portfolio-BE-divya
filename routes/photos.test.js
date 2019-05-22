const request = require('supertest')
const app = require('../server')
const db = require('../db/knex')

test('set to testing environment', () => {
  expect(process.env.DB_ENV).toBe('testing')
})
