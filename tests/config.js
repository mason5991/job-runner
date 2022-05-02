import config from '../env/test/config.json';

jest.mock('../configs/config.json', () => config);
