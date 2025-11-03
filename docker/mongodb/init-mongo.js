// MongoDB initialization script
// Creates collections and indexes for logging

db = db.getSiblingDB('claude101_logs');

// Activity logs collection - stores user activities
db.createCollection('activity_logs', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['memberId', 'action', 'timestamp'],
      properties: {
        memberId: {
          bsonType: 'string',
          description: 'UUID of the member performing the action'
        },
        action: {
          bsonType: 'string',
          enum: ['register', 'login', 'logout', 'update_profile', 'password_change', 'delete_account'],
          description: 'Type of action performed'
        },
        ipAddress: {
          bsonType: 'string',
          description: 'IP address of the user'
        },
        userAgent: {
          bsonType: 'string',
          description: 'Browser/device user agent'
        },
        metadata: {
          bsonType: 'object',
          description: 'Additional action-specific data'
        },
        timestamp: {
          bsonType: 'date',
          description: 'When the action occurred'
        },
        success: {
          bsonType: 'bool',
          description: 'Whether the action succeeded'
        },
        errorMessage: {
          bsonType: 'string',
          description: 'Error message if action failed'
        }
      }
    }
  }
});

// Error logs collection - stores application errors
db.createCollection('error_logs', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['level', 'message', 'timestamp'],
      properties: {
        level: {
          bsonType: 'string',
          enum: ['error', 'warn', 'info', 'debug'],
          description: 'Log level'
        },
        message: {
          bsonType: 'string',
          description: 'Error message'
        },
        stack: {
          bsonType: 'string',
          description: 'Stack trace'
        },
        context: {
          bsonType: 'object',
          description: 'Additional context data'
        },
        timestamp: {
          bsonType: 'date',
          description: 'When the error occurred'
        }
      }
    }
  }
});

// Analytics collection - stores usage analytics
db.createCollection('analytics', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['eventType', 'timestamp'],
      properties: {
        eventType: {
          bsonType: 'string',
          description: 'Type of analytics event'
        },
        memberId: {
          bsonType: 'string',
          description: 'UUID of the member (optional for anonymous events)'
        },
        data: {
          bsonType: 'object',
          description: 'Event-specific data'
        },
        timestamp: {
          bsonType: 'date',
          description: 'When the event occurred'
        }
      }
    }
  }
});

// Create indexes for better query performance
db.activity_logs.createIndex({ memberId: 1, timestamp: -1 });
db.activity_logs.createIndex({ action: 1, timestamp: -1 });
db.activity_logs.createIndex({ timestamp: -1 });

db.error_logs.createIndex({ level: 1, timestamp: -1 });
db.error_logs.createIndex({ timestamp: -1 });

db.analytics.createIndex({ eventType: 1, timestamp: -1 });
db.analytics.createIndex({ memberId: 1, timestamp: -1 });
db.analytics.createIndex({ timestamp: -1 });

// TTL indexes to auto-delete old logs (optional - adjust as needed)
// Activity logs expire after 90 days
db.activity_logs.createIndex({ timestamp: 1 }, { expireAfterSeconds: 7776000 });

// Error logs expire after 30 days
db.error_logs.createIndex({ timestamp: 1 }, { expireAfterSeconds: 2592000 });

// Sample data for testing
db.activity_logs.insertOne({
  memberId: 'test-uuid',
  action: 'register',
  ipAddress: '127.0.0.1',
  userAgent: 'Mozilla/5.0',
  metadata: { source: 'web' },
  timestamp: new Date(),
  success: true
});

print('MongoDB initialization completed successfully');
