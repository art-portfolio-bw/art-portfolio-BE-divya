require('dotenv').config()
const request = require('supertest')
const app = require('../server')

const token = process.env.TOKEN

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
  test('returns 200, if photo exists in DB', async () => {
    const res = await request(app).get('/1')
    expect(res.status).toBe(200)
  })

  test(`returns 404, if photo doesn't exist in DB`, async () => {
    const res = await request(app).get('/1000')
    expect(res.status).toBe(404)
  })

  test('returns an object', async () => {
    const res = await request(app).get('/1')
    expect(typeof res.body).toBe('object')
  })
})

describe(`PUT /:photoId`, () => {
  test(`returns 401, if user isn't authenticated`, async () => {
    const res = await request(app).put('/1')
    expect(res.status).toBe(401)
  })

  test(`returns 404, if photo doesn't exist in DB`, async () => {
    const res = await request(app).put('/1000')
    expect(res.status).toBe(404)
  })

  test(`returns 422, if required field isn't provided`, async () => {
    const res = await request(app)
      .put('/31')
      .set('token', token) // authenticate user with token
      .send({ incorrectKey: 'testing' })
    expect(res.status).toBe(422)
  })

  test(`returns 200, if user is authenticated and required field is provided`, async () => {
    const res = await request(app)
      .put('/31')
      .set('token', token)
      .send({ description: 'testing' })
    expect(res.status).toBe(200)
  })
})
