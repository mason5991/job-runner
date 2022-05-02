import Bull, { Job, QueueOptions } from 'bull';
import path from 'path';
import QueueLogger from './QueueLogger.service';

class Queue extends Bull {
  logger: QueueLogger;

  constructor(queueName: string, opts: QueueOptions | undefined) {
    super(queueName, opts);
    this.logger = new QueueLogger(this.name);
  }

  log(data) {
    this.logger.log(data);
  }

  listener() {
    // Listeners
    this
      // When queue error
      .on('error', function (err) {
        this.logger.error(err);
      })
      // When queue on progress
      .on('progress', function (job: Job, progress) {
        this.logger.progress(job.toJSON(), progress);
      })
      // When queue failed
      .on('failed', function (job: Job, err) {
        this.logger.failed(err, job.toJSON());
      })
      // When queue completed
      .on('completed', function (job: Job, result) {
        this.logger.completed(job.toJSON(), JSON.stringify(result));
      });
  }

  consumer(jobs) {
    Object.keys(jobs).forEach((key) => {
      // Define queue processor
      const processorPath = path.resolve(
        __dirname,
        `../../${jobs[key].processor}`,
      );
      console.log(`Initializing job ${key} with processor ${processorPath}`);
      this.process(key, processorPath);
    });
  }
}

export default Queue;
