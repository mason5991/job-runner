import fs from 'fs';
import path from 'path';
import Queue from '../services/Queue';

export const getQueueAllConfig = () => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, '../../configs/queue.json'),
      'utf8',
    );
    if (!data) {
      return {};
    }
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const getQueueNames = () => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, '../../configs/queue.json'),
      'utf8',
    );
    const { queues: qs } = JSON.parse(data);
    return Object.keys(qs);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getQueueConfig = (queueName: string) => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, '../../configs/queue.json'),
      'utf8',
    );
    const { queues: qs } = JSON.parse(data);
    if (!qs[queueName]) {
      return null;
    }
    return { ...qs[queueName], name: queueName };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const initQueue = (name, config, opts) => {
  const queue = new Queue(name, opts);
  const { jobs } = config;
  const jobQueue: { [key: string]: Queue } = {};
  queue.log(`Initializing queue ${name}, opts: ${JSON.stringify(opts)}`);
  queue.log(`Jobs support: ${Object.keys(jobs).join(', ')}`);
  queue.listener();
  queue.consumer(jobs);
  Object.keys(jobs).forEach((key) => {
    jobQueue[key] = queue;
  });
  return jobQueue;
};

export const initQueues = (queueConfig) => {
  const { queues, redis: globalRedis } = queueConfig;
  if (queues) {
    let allQueues: { [key: string]: Queue } = {};
    Object.keys(queues).forEach((name) => {
      const { opts, redis, ...args } = queues[name];
      const queue = initQueue(name, args, { redis: redis || globalRedis });
      allQueues = { ...allQueues, ...queue };
    });
    return allQueues;
  }
  return {};
};

export const getRedisConfig = (queueName?: string) => {
  try {
    const { queues, redis } = JSON.parse(
      fs.readFileSync(`${__dirname}/../../configs/queue.json`, 'utf8'),
    );
    if (queueName && queues[queueName] && queues[queueName].redis) {
      return queues[queueName].redis;
    }
    if (redis) {
      return redis;
    }
    return {};
  } catch (err) {
    console.error(err);
    return {};
  }
};

export default {
  getQueueAllConfig,
  getQueueNames,
  getQueueConfig,
  initQueue,
  initQueues,
  getRedisConfig,
};
