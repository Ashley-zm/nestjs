import { Logger } from '@nestjs/common';
import Redis from 'ioredis';

const logger = new Logger('auth.service');
const redisIndex = []; // 用于记录 redis 实例索引
const redisList = []; // 用于存储 redis 实例
const redisOption = {
  host: '127.0.0.1',
  port: 6379,
  password: 'password',
};
export class RedisInstance {
  static async initRedis(method: string, db = 0) {
    const isExist = redisIndex.some((x) => x === db);
    if (!isExist) {
      Logger.debug(`[Redis ${db}]来自 ${method} 方法调用 `);
      redisList[db] = new Redis({ ...redisOption, db });
      redisIndex.push(db);
    } else {
      Logger.debug(`[Redis ${db}]来自 ${method} 方法调用`);
    }
    return redisList[db];
  }

  static async setRedis(
    method: string,
    db = 0,
    key: string,
    val: string,
    timeout = 60 * 60,
  ) {
    if (typeof val == 'object') {
      val = JSON.stringify(val);
    }
    const redis = await RedisInstance.initRedis(method, db);
    redis.set(`${key}`, val);
    redis.expire(`${key}`, timeout);
  }
  static async getRedis(method: string, db = 0, key: string) {
    return new Promise(async (resolve, reject) => {
      const redis = await RedisInstance.initRedis(method, db);
      redis.get(`${key}`, (err, val) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(val);
      });
    });
  }
}
