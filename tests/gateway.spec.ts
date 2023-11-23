import request from 'supertest';
import { app, gateway } from '../src/gateway';

describe('GET /', () => {
    afterAll((done) => {
        gateway.close(done);
    });
  it('should return a 200 status and the correct message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Running Gateway');
  });
});
