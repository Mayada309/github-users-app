import type { User } from '../types/user';
import UserItem from './UserItem';

interface UserListProps {
  users: User[];
}

function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
        No users found.
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
