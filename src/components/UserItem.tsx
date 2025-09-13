import type { User } from '../types/user';
import FavoriteButton from './FavoriteButton';

interface UserItemProps {
  user: User;
}

function UserItem({ user }: UserItemProps) {
  const handleRowClick = () => {
    window.open(user.html_url, '_blank', 'noopener,noreferrer');
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]'
      onClick={handleRowClick}
      title={`Click to view ${user.login}'s GitHub profile`}
    >
      <div className='flex items-center space-x-4'>
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className='w-16 h-16 rounded-full object-cover'
        />
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
            {user.login}
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            ID: {user.id}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Type: {user.type}
          </p>
        </div>
        <div className='flex flex-col space-y-2' onClick={handleButtonClick}>
          <div className='px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors text-center'>
            View Profile →
          </div>
          <FavoriteButton user={user} />
        </div>
      </div>
    </div>
  );
}

export default UserItem;
