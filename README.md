# Job runner

This is the job runner for running scheduler's job. Multiple runners can setup at the same time and pick up the jobs from the queue automatically.

## Installation

```
yarn install
```

## Start

Add configuration file `queue.json`

```json
# queue.json
{
  "queues": {
    "scheduler": {
      // Redis server
      "redis": {
        "host": "localhost",
        "port": 6379,
        "db": 1
      },
      "jobs": {
        // Example jobs
        "delay": {
          "processor": "processors/delay.processor.js"
        }
      }
    }
  },
  // Bull options
  "opts": {}
}
```

Then run it.

```
yarn start
```
