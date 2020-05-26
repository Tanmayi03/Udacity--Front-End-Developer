import 'regenerator-runtime/runtime.js';
const request = require('supertest');
const app = require('./app');

describe('/all successfully returns', () => {
  test('It responds to the get method', async () => {
    const response = await request(app).get('/all');
    expect(response.body).toStrictEqual({});
    expect(response.statusCode).toBe(200);
  });
});