import { existsSync, mkdirSync } from 'fs';
import { appendFile } from 'fs/promises';
import { JobId } from 'bull';
import { QueueJson } from '../interfaces/queue.interface';

export interface GlobalLogger {
  error: (err: Error) => Promise<void>;
  completed: (jobId: JobId, result: any) => Promise<void>;
  failed: (err: Error, jobId: JobId) => Promise<void>;
  progress: (jobId: JobId, progress: number) => Promise<void>;
}
class QueueLogger {
  fileName: string;

  logDirectory: string;

  filePath: string;

  jobName: string;

  constructor(jobName: string) {
    this.logDirectory = 'logs/';
    this.fileName = 'queue.log';
    this.filePath = `${this.logDirectory}${this.fileName}`;
    this.jobName = jobName;

    if (!existsSync(this.logDirectory)) {
      mkdirSync(this.logDirectory);
    }
  }

  async log(data: string): Promise<void> {
    const current = new Date();
    const logData = `[Log][${current.toString()}][${this.jobName}] ${data}`;
    if (process.env.QUEUE_LOG === 'debug') {
      console.log(logData);
    }
    return appendFile(this.filePath, `${logData}\n`);
  }

  async error(err: Error): Promise<void> {
    const current = new Date();
    const logData = `[Error][${current.toString()}][${this.jobName}] ${
      err.stack
    }`;
    if (process.env.QUEUE_LOG === 'debug') {
      console.log(logData);
    }
    return appendFile(this.filePath, `${logData}\n`);
  }

  async completed(jobData: QueueJson, result: string = ''): Promise<void> {
    const current = new Date();
    const { data, returnvalue, ...log } = jobData;
    const logData = `[Completed][${current.toString()}][${
      this.jobName
    }] ${JSON.stringify(log)}`;
    if (process.env.QUEUE_LOG === 'debug') {
      console.log(logData);
    }
    return appendFile(this.filePath, `${logData}\n`);
  }

  async failed(err: Error, jobData: QueueJson): Promise<void> {
    const current = new Date();
    const { data, returnvalue, ...log } = jobData;
    const logData = `[Failed][${current.toString()}][${this.jobName}] ${
      err.stack
    } ${JSON.stringify(log)}`;
    if (process.env.QUEUE_LOG === 'debug') {
      console.log(logData);
    }
    return appendFile(this.filePath, `${logData}\n`);
  }

  async progress(jobData: QueueJson, progress: any = ''): Promise<void> {
    const current = new Date();
    const { data, returnvalue, ...log } = jobData;
    const logData = `[Progress][${current.toString()}][${
      this.jobName
    }][Progress:${progress}] ${JSON.stringify(log)}`;
    if (process.env.QUEUE_LOG === 'debug') {
      console.log(logData);
    }
    return appendFile(this.filePath, `${logData}\n`);
  }

  global(): GlobalLogger {
    return {
      error: async (err) => {
        const current = new Date();
        const logData = `[Global:Error][${current.toString()}][${
          this.jobName
        }] ${err.stack}`;
        if (process.env.QUEUE_LOG === 'debug') {
          console.log(logData);
        }
        return appendFile(this.filePath, `${logData}\n`);
      },

      completed: async (jobId, result: string = '') => {
        const current = new Date();
        const logData = `[Global:Completed][${current.toString()}][${
          this.jobName
        }][jobId:${jobId}]`;
        if (process.env.QUEUE_LOG === 'debug') {
          console.log(logData);
        }
        return appendFile(this.filePath, `${logData}\n`);
      },

      failed: async (err, jobId) => {
        const current = new Date();
        const logData = `[Global:Failed][${current.toString()}][${
          this.jobName
        }][jobId:${jobId}] ${err.stack}`;
        if (process.env.QUEUE_LOG === 'debug') {
          console.log(logData);
        }
        return appendFile(this.filePath, `${logData}\n`);
      },

      progress: async (jobId, progress = 0) => {
        const current = new Date();
        const logData = `[Global:Progress][${current.toString()}][${
          this.jobName
        }][Progress:${progress}][jobId:${jobId}]`;
        if (process.env.QUEUE_LOG === 'debug') {
          console.log(logData);
        }
        return appendFile(this.filePath, `${logData}\n`);
      },
    };
  }
}

export default QueueLogger;
