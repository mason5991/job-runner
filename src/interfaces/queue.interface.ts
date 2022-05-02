import { JobId, JobOptions } from 'bull';

export interface QueueJson<T = any> {
  id: JobId;
  name: string;
  data: T;
  opts: JobOptions;
  progress: number;
  delay: number;
  timestamp: number;
  attemptsMade: number;
  failedReason: any;
  stacktrace: string[] | null;
  returnvalue: any;
  finishedOn: number | null;
  processedOn: number | null;
}
