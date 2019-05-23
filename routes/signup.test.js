require('dotenv').config()
const request = require('supertest')
const app = require('../server')
const db = require('../db/knex')
const knexCleaner = require('knex-cleaner')

const password = process.env.PASSWORD

test('set to testing environment', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

describe('POST /signup', () => {
  const fname = 'divya'
  const email = 'divya@email.com'

  test(`returns 422, if first name isn't provided`, async () => {
    const res = await request(app)
      .post('/signup')
      .send({ email, password })
    expect(res.status).toBe(422)
  })

  test(`returns 422, if email isn't provided`, async () => {
    const res = await request(app)
      .post('/signup')
      .send({ fname, password })
    expect(res.status).toBe(422)
  })

  test(`returns 422, if password isn't provided`, async () => {
    const res = await request(app)
      .post('/signup')
      .send({ fname, email })
    expect(res.status).toBe(422)
  })

  // test('returns 201 with token', async () => {
  //   await knexCleaner.clean(db) // empty out DB 'test' to fix duplicate email error
  //   const res = await request(app)
  //     .post('/signup')
  //     .send({ fname, email, password })
  //   expect(res.status).toBe(201)
  //   expect(res.body).toHaveProperty('token')
  // })
})
