import React from 'react';
import { Calendar } from 'lucide-react';
import { SortOrder } from '@/types';

interface SortingControlsProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

const SortingControls: React.FC<SortingControlsProps> = ({ sortOrder, onSortChange }) => {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <button
        onClick={() => onSortChange('newest')}
        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          sortOrder === 'newest'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        }`}
      >
        <Calendar className="w-4 h-4" />
        <span>Newest</span>
      </button>
      <button
        onClick={() => onSortChange('oldest')}
        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          sortOrder === 'oldest'
            ? 'bg-gray-800 text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        }`}
      >
        <Calendar className="w-4 h-4" />
        <span>Oldest</span>
      </button>
    </div>
  );
};

export default SortingControls;