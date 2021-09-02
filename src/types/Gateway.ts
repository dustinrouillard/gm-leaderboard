export interface User {
  avatar: string;
  bio: string;
  id: string;
  name: string;
  score: number;
  rank: number;
  username: string;
}

export interface OfficialUser {
  avatarUrl: string;
  bio: string;
  id: string;
  name: string;
  gmScore: number;
  rank: number;
  username: string;
}

export interface Post {
  creation_time: string;
  creator: string;
  id: string;
  type: string;
}
