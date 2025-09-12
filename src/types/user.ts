export type User = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  repos_url: string;
  type: 'User' | 'Organization';
};
