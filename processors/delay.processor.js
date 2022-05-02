// Example processor

const delayCounter = async (delay) => {
  console.log('Starting delay counter');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`=====Waiting ${delay} ms...=====`);
      resolve(true);
    }, delay);
  });
};

const delayProcessor = async (job) => {
  const { name, data: jobData } = job;
  const { data, datasetRefId } = jobData;
  console.log(`=====[process][job-${name}]=====`);
  console.log(JSON.stringify(data));
  await delayCounter(data.delay);
  const result = { done: true };
  job.progress(100);
  return Promise.resolve(result);
};

export default delayProcessor;
