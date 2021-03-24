import request from 'supertest';

import app from '../app';
import createConnection from '../db';

describe('User', () => {
  beforeAll(async () => {
    const conn = await createConnection();
    await conn.runMigrations();
  });

  afterAll(async () => {
    const conn = await createConnection();
    await conn.dropDatabase();
    await conn.close();
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@example.com',
      name: 'Example',
    });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a user with the an existing email', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@example.com',
      name: 'Example',
    });

    expect(response.status).toBe(400);
  });
});
