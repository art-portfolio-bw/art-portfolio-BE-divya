require('dotenv').config()
const request = require('supertest')
const app = require('../server')
const db = require('../db/knex')

const password = process.env.PASSWORD

test('set to testing environment', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

describe('POST /login', () => {
  const email = 'divya@email.com'

  test(`returns 404, if user doesn't exist in DB`, async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'testing@email.com', password })
    expect(res.status).toBe(404)
  })

  test(`returns 422, if email isn't provided`, async () => {
    const res = await request(app)
      .post('/login')
      .send({ password })
    expect(res.status).toBe(422)
  })

  test(`returns 422, if password isn't provided`, async () => {
    const res = await request(app)
      .post('/login')
      .send({ email })
    expect(res.status).toBe(422)
  })

  test(`returns 401, if user isn't authenticated`, async () => {
    const res = await request(app)
      .post('/login')
      .send({ email, password: 'testing' })
    expect(res.status).toBe(401)
  })

  test('returns 200', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email, password })
    expect(res.status).toBe(200)
  })
})
