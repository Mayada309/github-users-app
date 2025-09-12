import type { User } from '../types/user';
import { fetchData } from './api';

const githubApi = import.meta.env.VITE_GITHUB_API;

export const getAllUsers = async () => {
  const users: User[] = await fetchData(githubApi);
  return users;
};
