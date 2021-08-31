export interface User {
  avatar: string;
  bio: string;
  id: string;
  name: string;
  score: number;
  username: string;
}

export interface Post {
  creation_time: string;
  creator: string;
  id: string;
  type: string;
}
