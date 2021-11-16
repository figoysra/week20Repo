const redis = require('redis');
// const {} = require('')

const client = redis.createClient({
  host: 'redis-10687.c293.eu-central-1-1.ec2.cloud.redislabs.com', // localhost
  port: 10687,
  password: '12345',
});
client.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});

const redisAction = {
  set: (key, value) => {
    client.set(key, value);
    return true;
  },
};
module.exports = redisAction;
