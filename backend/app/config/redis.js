const redis = require("redis");

let client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  password: process.env.REDIS_PASSWORD,
});

client.connect();

client.on("error", (error) => {
  console.log(error);
});

module.exports = client;
