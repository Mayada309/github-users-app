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
      className='bg-card rounded-lg shadow-md p-4 border border-border hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] text-card-foreground'
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
          <h3 className='text-lg font-semibold text-foreground'>
            {user.login}
          </h3>
          <p className='text-sm text-muted-foreground'>ID: {user.id}</p>
          <p className='text-sm text-muted-foreground'>Type: {user.type}</p>
        </div>
        <div className='flex flex-col space-y-2' onClick={handleButtonClick}>
          <div className='px-4 py-2 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 transition-colors text-center'>
            View Profile →
          </div>
          <FavoriteButton user={user} />
        </div>
      </div>
    </div>
  );
}

export default UserItem;
