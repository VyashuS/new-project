'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Comment, SortOrder } from '@/types';
import { getNextCommentId } from '@/utils/helpers';

// Import components
import CommentItem from './CommentItem';
import AddCommentForm from './AddCommentForm';
import SortingControls from './SortingControls';

// Import data
import commentsData from '@/data/comments.json';

const CommentSystem: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  useEffect(() => {
    // Add timestamps to mock comments and sort by newest first
    const commentsWithTimestamps = commentsData.map((comment, index) => ({
      ...comment,
      timestamp: new Date(Date.now() - index * 60000).toISOString() // Each comment 1 minute apart
    }));
    setComments(commentsWithTimestamps as Comment[]);
  }, []);

  const handleAddComment = (newCommentData: Omit<Comment, 'id' | 'postId'>) => {
    const newComment: Comment = {
      ...newCommentData,
      id: getNextCommentId(comments.map(c => c.id)),
      postId: 1,
      timestamp: new Date().toISOString()
    };
    setComments([newComment, ...comments]);
  };

  const sortedComments = [...comments].sort((a, b) => {
    const timeA = new Date(a.timestamp || 0).getTime();
    const timeB = new Date(b.timestamp || 0).getTime();
    return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Comment System</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your thoughts and engage with the community. Join the conversation below!
          </p>
        </div>

        {/* Add Comment Form */}
        <AddCommentForm onAddComment={handleAddComment} />

        {/* Comments Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Comments ({comments.length})
            </h2>
            <SortingControls
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
            />
          </div>

          <div className="space-y-4 w-full">
            {sortedComments.length > 0 ? (
              sortedComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
                <p className="text-gray-600">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSystem;