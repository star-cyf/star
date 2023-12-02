import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  integer,
  primaryKey
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel, relations } from "drizzle-orm";

// User Types
export type SelectUserType = InferSelectModel<typeof users>;
export type InsertUserType = InferInsertModel<typeof users>;

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  googleId: varchar("google_id").unique().notNull(),
  roleId: integer("role_id")
    .default(1)
    .notNull()
    .references(() => roles.id),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  email: varchar("email").unique(),
  picture: varchar("picture"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

// Relation for Users Table
export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id]
  }),
  questions: many(questions),
  answers: many(answers),
  comments: many(comments)
}));

// Questions Table
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  likes: integer("likes").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Relations for Questions Table
export const questionsRelations = relations(questions, ({ one, many }) => ({
  user: one(users, {
    fields: [questions.userId],
    references: [users.id]
  }),
  answers: many(answers),
  questionsToTags: many(questionsToTags)
}));

// Answers Table
export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  questionId: integer("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  situation: text("situation").notNull(),
  task: text("task").notNull(),
  action: text("action").notNull(),
  result: text("result").notNull(),
  likes: integer("likes").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Relations for Answers Table
export const answersRelations = relations(answers, ({ one, many }) => ({
  user: one(users, {
    fields: [answers.userId],
    references: [users.id]
  }),
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id]
  }),
  comments: many(comments)
}));

// Comments Table
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade"
    }),
  answerId: integer("answer_id")
    .notNull()
    .references(() => answers.id, { onDelete: "cascade" }),
  comment: text("comment").notNull(),
  likes: integer("likes").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Relations for Comments Table
export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id]
  }),
  answer: one(answers, {
    fields: [comments.answerId],
    references: [answers.id]
  })
}));

// Tags Table
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  tag: varchar("tag").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Relations for Tags Table
export const tagsRelations = relations(tags, ({ many }) => ({
  questionsToTags: many(questionsToTags),
  answersToTags: many(answersToTags),
  commentsToTags: many(commentsToTags)
}));

// QuestionsToTags Table
export const questionsToTags = pgTable(
  "questions_to_tags",
  {
    questionId: integer("question_id")
      .notNull()
      .references(() => questions.id, {
        onDelete: "cascade"
      }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" })
  },
  (t) => ({
    pk: primaryKey({ columns: [t.questionId, t.tagId] })
  })
);

// Relations for questionsToTags Table
export const questionsToTagsRelations = relations(
  questionsToTags,
  ({ one }) => ({
    question: one(questions, {
      fields: [questionsToTags.questionId],
      references: [questions.id]
    }),
    tag: one(tags, {
      fields: [questionsToTags.tagId],
      references: [tags.id]
    })
  })
);

// AnswersToTags Table
export const answersToTags = pgTable(
  "answers_to_tags",
  {
    answerId: integer("answer_id")
      .notNull()
      .references(() => answers.id, {
        onDelete: "cascade"
      }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" })
  },
  (t) => ({
    pk: primaryKey({ columns: [t.answerId, t.tagId] })
  })
);

// Relations for answersToTags Table
export const answersToTagsRelations = relations(answersToTags, ({ one }) => ({
  answer: one(answers, {
    fields: [answersToTags.answerId],
    references: [answers.id]
  }),
  tag: one(tags, {
    fields: [answersToTags.tagId],
    references: [tags.id]
  })
}));

// commentsToTags Table
export const commentsToTags = pgTable(
  "comments_to_tags",
  {
    commentId: integer("comment_id")
      .notNull()
      .references(() => comments.id, {
        onDelete: "cascade"
      }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" })
  },
  (t) => ({
    pk: primaryKey({ columns: [t.commentId, t.tagId] })
  })
);

// Relations for commentsToTags Table
export const commentsToTagsRelations = relations(commentsToTags, ({ one }) => ({
  comment: one(comments, {
    fields: [commentsToTags.commentId],
    references: [comments.id]
  }),
  tag: one(tags, {
    fields: [commentsToTags.tagId],
    references: [tags.id]
  })
}));

// Roles Table
export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  role: varchar("role").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Relations for Roles Table
export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users)
}));
