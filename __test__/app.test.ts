import request from 'supertest';

import { app } from '../src/app';

describe('GET /users', () => {

  it('should return a list of users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
  });

});
