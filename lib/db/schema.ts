import { pgTable, uuid, varchar, text, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core'

// Enum para planes
export const planEnum = pgEnum('plan', ['free', 'pro', 'elite'])
export const modelProviderEnum = pgEnum('model_provider', ['gemini', 'claude'])

// Tabla de agentes
export const agents = pgTable('agents', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description').notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  planRequired: planEnum('plan_required').notNull().default('free'),
  basePrompt: text('base_prompt').notNull(),
  modelProvider: modelProviderEnum('model_provider').notNull().default('gemini'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Tabla de conversaciones
export const conversations = pgTable('conversations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  agentId: uuid('agent_id')
    .notNull()
    .references(() => agents.id),
  title: varchar('title', { length: 200 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Tabla de mensajes
export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  conversationId: uuid('conversation_id')
    .notNull()
    .references(() => conversations.id),
  role: varchar('role', { length: 20 }).notNull(), // 'user' | 'assistant'
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
