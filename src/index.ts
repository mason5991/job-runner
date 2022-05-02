import dotenv from 'dotenv';
import path from 'path';
import { printInfo, printDebug } from './utils/log';
import app from './app';
import { initQueues, getQueueAllConfig } from './utils/queue.util';

dotenv.config({ path: path.join(__dirname, '../.env') });

const port = process.env.PORT || 4001;

printDebug(`=====CURRENT NODE ENVIRONMENT===== ${process.env.NODE_ENV}`);

// Initialize queues
const queueConfig = getQueueAllConfig();
initQueues(queueConfig);

app.listen(port, async () => {
  printInfo(`API listening at http://localhost:${port}`);
});
