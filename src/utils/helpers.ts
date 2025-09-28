// src/utils/helpers.ts

import { User } from '@/types';
import usersData from '@/data/users.json';

/**
 * Get user initials from full name
 */
export const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

/**
 * Get user by email from users data
 */
export const getUserByEmail = (email: string): User | undefined => {
  return usersData.find(user => user.email === email);
};

/**
 * Generate next comment ID
 */
export const getNextCommentId = (existingIds: number[]): number => {
  return existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
};