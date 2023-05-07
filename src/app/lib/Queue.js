import Queue from 'bull';
import redisConfig from '../config/redis'
import CreateAccount from '../jobs/CreateAccount';

const accountQueue = new Queue(CreateAccount.key, redisConfig);

accountQueue.on('failed', (job, err) => {
    console.log('Job failed', job.name, jog.data)
    console.log(err);
})

export default accountQueue;