'use client';

import React, { useState } from 'react';
import { User } from '@/types';
import { getInitials } from '@/utils/helpers';
import usersData from '@/data/users.json';

interface UserDropdownProps {
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ selectedUser, onUserSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <div className="flex items-center space-x-3">
          {selectedUser && (
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white font-medium text-xs">
              {getInitials(selectedUser.name)}
            </div>
          )}
          <div>
            <div className={`text-sm font-medium ${selectedUser ? 'text-gray-900' : 'text-gray-500'}`}>
              {selectedUser ? selectedUser.name : 'Choose a user to comment as...'}
            </div>
            {selectedUser && (
              <div className="text-xs text-gray-500">
                ({selectedUser.company.name})
              </div>
            )}
          </div>
        </div>
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {usersData.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => {
                onUserSelect(user as User);
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            >
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white font-medium text-xs">
                {getInitials(user.name)}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">({user.company.name})</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
