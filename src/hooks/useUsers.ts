import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../services/users';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
};