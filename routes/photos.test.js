const request = require('supertest')
const app = require('../server')
const db = require('../db/knex')

test('set to testing environment', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

describe('GET /', () => {
  test('returns 200', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
  })

  test('returns an array', async () => {
    const res = await request(app).get('/')
    expect(res.body).toEqual(expect.arrayContaining([]))
  })
})


