// src/types/index.ts

export interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  timestamp?: string;
}

export interface CommentWithUser extends Comment {
  user?: User;
}

export type SortOrder = 'newest' | 'oldest';