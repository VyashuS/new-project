'use client';

import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { User, Comment } from '@/types';
import UserDropdown from './UserDropdown';
import usersData from '@/data/users.json';

interface AddCommentFormProps {
  onAddComment: (comment: Omit<Comment, 'id' | 'postId'>) => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({ onAddComment }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !commentText.trim()) return;

    onAddComment({
      name: selectedUser.name,
      email: selectedUser.email,
      body: commentText.trim()
    });

    setCommentText('');
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Add a Comment</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select User
          </label>
          <UserDropdown
            selectedUser={selectedUser}
            onUserSelect={setSelectedUser}
          />
        
        {selectedUser && (
          <p className="mt-2 text-sm text-gray-600">
            Commenting as {selectedUser.name} from {selectedUser.company.name}
          </p>
        )}
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Comment
          </label>
          <textarea
            id="comment"
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Write your comment here..."
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedUser || !commentText.trim()}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
          <span>Post Comment</span>
        </button>
      </div>
    </div>
  );
};

export default AddCommentForm;
