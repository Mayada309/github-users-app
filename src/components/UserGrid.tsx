import type { User } from '../types/user';
import UserCard from './UserCard';

interface UserGridProps {
  users: User[];
}

function UserGrid({ users }: UserGridProps) {
  if (users.length === 0) {
    return (
      <div className='text-center py-8 text-muted-foreground'>
        No users found.
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserGrid;
