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

describe('GET /:photoId', () => {
  test('returns 200, if photoId exists in DB', async () => {
    const res = await request(app).get('/1')
    expect(res.status).toBe(200)
  })

  test(`returns 404, if photoId doesn't exist in DB`, async () => {
    const res = await request(app).get('/1000')
    expect(res.status).toBe(404)
  })

  test('returns an object', async () => {
    const res = await request(app).get('/1')
    expect(typeof res.body).toBe('object')
  })
})
