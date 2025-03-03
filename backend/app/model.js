import redisClient from "./config/redis.js";

export const saveCallId = async (key, value) => {
  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: 86400, // Expiration time in seconds (1 day)
    });
    return "OK";
  } catch (error) {
    throw error;
  }
};

export const getCallId = async (key) => {
  try {
    const res = await redisClient.get(key);
    return res ? JSON.parse(res) : null;
  } catch (error) {
    throw error;
  }
};
