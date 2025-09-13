import FavoriteButton from './FavoriteButton';
import type { User } from '../types/user';
import { Card, CardContent } from './ui/card';

interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps) {
  const handleCardClick = () => {
    window.open(user.html_url, '_blank', 'noopener,noreferrer');
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      className='rounded-lg shadow-md p-4 border border-border hover:shadow-lg transition-all cursor-pointer hover:scale-105 bg-card text-card-foreground'
      onClick={handleCardClick}
      title={`Click to view ${user.login}'s GitHub profile`}
    >
      <CardContent className='flex flex-col items-center space-y-3'>
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className='w-20 h-20 rounded-full object-cover'
        />
        <div className='text-center'>
          <h3 className='text-lg font-semibold capitalize text-foreground'>
            {user.login}
          </h3>
          <p className='text-sm text-muted-foreground'>Type: {user.type}</p>
        </div>
        <div onClick={handleButtonClick}>
          <FavoriteButton user={user} />
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;
