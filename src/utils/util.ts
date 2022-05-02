import fs from 'fs';

export const getProcessorPath = (processor: string) =>
  process.env.NODE_ENV === 'production' ? `${processor}.js` : `${processor}.ts`;

export const getEnv = (key: string): string | undefined => process.env[key];

export const getConfig = () => {
  try {
    const data = fs.readFileSync(
      `${__dirname}/../../configs/config.json`,
      'utf8',
    );
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return {};
  }
};

export default {
  getProcessorPath,
  getEnv,
  getConfig,
};
