/**
 * Redis Connection
 *
 * Manages connection to Redis for session management and caching.
 * Supports pub/sub, caching, and session storage.
 */

import { createClient, RedisClientType } from 'redis';

// Singleton pattern to ensure only one client instance
let redisClient: RedisClientType | null = null;
let isConnecting = false;

/**
 * Get or create Redis client
 */
export async function getRedisClient(): Promise<RedisClientType> {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  // Prevent multiple simultaneous connection attempts
  if (isConnecting) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getRedisClient();
  }

  isConnecting = true;

  try {
    const url = process.env.REDIS_URL ||
                `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`;

    redisClient = createClient({
      url,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            console.error('Redis reconnection failed after 10 attempts');
            return new Error('Redis reconnection failed');
          }
          // Exponential backoff: 50ms, 100ms, 200ms, ...
          return Math.min(retries * 50, 3000);
        },
      },
    });

    // Event handlers
    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Redis client connected');
    });

    redisClient.on('ready', () => {
      console.log('Redis client ready');
    });

    redisClient.on('reconnecting', () => {
      console.log('Redis client reconnecting');
    });

    await redisClient.connect();
    console.log('Redis connection established');

    return redisClient;
  } finally {
    isConnecting = false;
  }
}

/**
 * Cache operations
 */
export const cache = {
  /**
   * Get value from cache
   */
  async get<T = string>(key: string): Promise<T | null> {
    const client = await getRedisClient();
    const value = await client.get(key);

    if (!value) return null;

    // Try to parse JSON, return string if it fails
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  },

  /**
   * Set value in cache with optional expiration (in seconds)
   */
  async set(key: string, value: any, expirationSeconds?: number): Promise<void> {
    const client = await getRedisClient();
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

    if (expirationSeconds) {
      await client.setEx(key, expirationSeconds, stringValue);
    } else {
      await client.set(key, stringValue);
    }
  },

  /**
   * Delete key from cache
   */
  async delete(key: string): Promise<void> {
    const client = await getRedisClient();
    await client.del(key);
  },

  /**
   * Check if key exists
   */
  async exists(key: string): Promise<boolean> {
    const client = await getRedisClient();
    const result = await client.exists(key);
    return result === 1;
  },

  /**
   * Set expiration on existing key
   */
  async expire(key: string, seconds: number): Promise<void> {
    const client = await getRedisClient();
    await client.expire(key, seconds);
  },
};

/**
 * Session operations
 */
export const session = {
  /**
   * Create a new session
   */
  async create(sessionId: string, data: any, expirationSeconds = 86400): Promise<void> {
    await cache.set(`session:${sessionId}`, data, expirationSeconds);
  },

  /**
   * Get session data
   */
  async get<T = any>(sessionId: string): Promise<T | null> {
    return await cache.get<T>(`session:${sessionId}`);
  },

  /**
   * Update session data
   */
  async update(sessionId: string, data: any, expirationSeconds = 86400): Promise<void> {
    await cache.set(`session:${sessionId}`, data, expirationSeconds);
  },

  /**
   * Delete session
   */
  async destroy(sessionId: string): Promise<void> {
    await cache.delete(`session:${sessionId}`);
  },

  /**
   * Extend session expiration
   */
  async extend(sessionId: string, expirationSeconds = 86400): Promise<void> {
    await cache.expire(`session:${sessionId}`, expirationSeconds);
  },
};

/**
 * Rate limiting operations
 */
export const rateLimit = {
  /**
   * Check and increment rate limit counter
   * Returns true if limit is exceeded
   */
  async check(key: string, limit: number, windowSeconds: number): Promise<boolean> {
    const client = await getRedisClient();
    const rateLimitKey = `ratelimit:${key}`;

    const current = await client.incr(rateLimitKey);

    if (current === 1) {
      await client.expire(rateLimitKey, windowSeconds);
    }

    return current > limit;
  },

  /**
   * Reset rate limit counter
   */
  async reset(key: string): Promise<void> {
    await cache.delete(`ratelimit:${key}`);
  },
};

/**
 * Close Redis connection
 */
export async function closeRedis(): Promise<void> {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
    redisClient = null;
    console.log('Redis connection closed');
  }
}

/**
 * Test Redis connection
 */
export async function testRedisConnection(): Promise<boolean> {
  try {
    const client = await getRedisClient();
    await client.ping();
    console.log('Redis connection successful');
    return true;
  } catch (error) {
    console.error('Redis connection failed:', error);
    return false;
  }
}
