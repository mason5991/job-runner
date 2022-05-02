import supertest from 'supertest';
import app from '../../src/app';
import { mockGetVersionSuccessResponse } from '../api/version.mock';

describe('Version API - GET /version', () => {
  const request = supertest(app);
  const ENDPOINT = '/version';

  test('Success[200] - response version', async () => {
    const response = await request.get(ENDPOINT);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(mockGetVersionSuccessResponse.success);
    expect(response.body.result).toHaveProperty('packageVersion');
    expect(response.body.result.packageVersion).toMatch(
      mockGetVersionSuccessResponse.result.packageVersion,
    );
  });
});
