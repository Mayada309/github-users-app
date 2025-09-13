import type { User } from '../types/user';
import { fetchData } from './api';
import { GITHUB_API } from './env';

export const getAllUsers = async () => {
  const users: User[] = await fetchData(GITHUB_API);
  return users;
};
