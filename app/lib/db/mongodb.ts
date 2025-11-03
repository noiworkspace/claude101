/**
 * MongoDB Connection
 *
 * Manages connection to MongoDB for logging and analytics.
 * Provides helper functions for common operations.
 */

import { MongoClient, Db, Collection } from 'mongodb';

// Singleton pattern
let client: MongoClient | null = null;
let db: Db | null = null;
let isConnecting = false;

/**
 * Get or create MongoDB client
 */
export async function getMongoClient(): Promise<MongoClient> {
  if (client && db) {
    return client;
  }

  // Prevent multiple simultaneous connection attempts
  if (isConnecting) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getMongoClient();
  }

  isConnecting = true;

  try {
    const url = process.env.MONGODB_URL ||
                `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST || 'localhost'}:${process.env.MONGODB_PORT || 27017}/${process.env.MONGODB_DB || 'claude101_logs'}?authSource=admin`;

    client = new MongoClient(url, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    await client.connect();
    db = client.db(process.env.MONGODB_DB || 'claude101_logs');

    console.log('MongoDB connection established');

    return client;
  } finally {
    isConnecting = false;
  }
}

/**
 * Get database instance
 */
export async function getDb(): Promise<Db> {
  if (!db) {
    await getMongoClient();
  }
  return db!;
}

/**
 * Get collection
 */
export async function getCollection<T extends Record<string, any> = any>(name: string): Promise<Collection<T>> {
  const database = await getDb();
  return database.collection<T>(name);
}

/**
 * Activity log operations
 */
export const activityLog = {
  /**
   * Log a member activity
   */
  async log(data: {
    memberId: string;
    action: 'register' | 'login' | 'logout' | 'update_profile' | 'password_change' | 'delete_account';
    ipAddress?: string;
    userAgent?: string;
    metadata?: Record<string, any>;
    success?: boolean;
    errorMessage?: string;
  }): Promise<void> {
    const collection = await getCollection('activity_logs');
    await collection.insertOne({
      ...data,
      timestamp: new Date(),
    });
  },

  /**
   * Get activity logs for a member
   */
  async getByMember(memberId: string, limit = 50): Promise<any[]> {
    const collection = await getCollection('activity_logs');
    return await collection
      .find({ memberId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
  },

  /**
   * Get recent activities
   */
  async getRecent(limit = 100): Promise<any[]> {
    const collection = await getCollection('activity_logs');
    return await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
  },

  /**
   * Get activities by action type
   */
  async getByAction(action: string, limit = 50): Promise<any[]> {
    const collection = await getCollection('activity_logs');
    return await collection
      .find({ action })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
  },
};

/**
 * Error log operations
 */
export const errorLog = {
  /**
   * Log an error
   */
  async log(data: {
    level: 'error' | 'warn' | 'info' | 'debug';
    message: string;
    stack?: string;
    context?: Record<string, any>;
  }): Promise<void> {
    const collection = await getCollection('error_logs');
    await collection.insertOne({
      ...data,
      timestamp: new Date(),
    });
  },

  /**
   * Get recent errors
   */
  async getRecent(limit = 50): Promise<any[]> {
    const collection = await getCollection('error_logs');
    return await collection
      .find({ level: { $in: ['error', 'warn'] } })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
  },

  /**
   * Get errors by level
   */
  async getByLevel(level: string, limit = 50): Promise<any[]> {
    const collection = await getCollection('error_logs');
    return await collection
      .find({ level })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
  },
};

/**
 * Analytics operations
 */
export const analytics = {
  /**
   * Track an event
   */
  async track(data: {
    eventType: string;
    memberId?: string;
    data?: Record<string, any>;
  }): Promise<void> {
    const collection = await getCollection('analytics');
    await collection.insertOne({
      ...data,
      timestamp: new Date(),
    });
  },

  /**
   * Get events by type
   */
  async getByType(eventType: string, limit = 100): Promise<any[]> {
    const collection = await getCollection('analytics');
    return await collection
      .find({ eventType })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
  },

  /**
   * Get events for a member
   */
  async getByMember(memberId: string, limit = 100): Promise<any[]> {
    const collection = await getCollection('analytics');
    return await collection
      .find({ memberId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
  },

  /**
   * Get event count by type (aggregation)
   */
  async getCountByType(startDate?: Date, endDate?: Date): Promise<any[]> {
    const collection = await getCollection('analytics');
    const match: any = {};

    if (startDate || endDate) {
      match.timestamp = {};
      if (startDate) match.timestamp.$gte = startDate;
      if (endDate) match.timestamp.$lte = endDate;
    }

    return await collection
      .aggregate([
        { $match: match },
        { $group: { _id: '$eventType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .toArray();
  },
};

/**
 * Close MongoDB connection
 */
export async function closeMongo(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed');
  }
}

/**
 * Test MongoDB connection
 */
export async function testMongoConnection(): Promise<boolean> {
  try {
    const database = await getDb();
    await database.command({ ping: 1 });
    console.log('MongoDB connection successful');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    return false;
  }
}
