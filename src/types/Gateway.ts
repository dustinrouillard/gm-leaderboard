export interface User {
  avatar: string;
  bio: string;
  uid: string;
  name: string;
  score: number;
  rank: number;
  username: string;
}

export interface OfficialUser {
  avatarUrl: string;
  bio: string;
  uid: string;
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

export interface PostWithCreator {
  creation_time: string;
  creator: User;
  id: string;
  type: string;
  text: string;
}
