const redis = require('redis')

const client = redis.createClient(process.env.REDIS_CONNECT);
client.on('error', err => console.log('Redis Server Error', err));
client.connect();

export default client