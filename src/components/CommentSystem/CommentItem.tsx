import React from 'react';
import { CommentWithUser } from '@/types';
import { getInitials, getUserByEmail } from '@/utils/helpers';

interface CommentItemProps {
  comment: CommentWithUser;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const user = getUserByEmail(comment.email);
  const initials = getInitials(comment.name);
  
  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-sm border border-gray-100">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-medium text-sm">
            {initials}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{comment.name}</h3>
              <p className="text-sm text-gray-600">{comment.email}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {user?.company.name || 'Unknown Company'}
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{comment.body}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;