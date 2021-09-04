import { Post, User } from "../types/Gateway";

export const API_HOST = "https://gm-api.dstn.to";

const avatars = [
  'https://files.dstn.to/c84b88850edaa102.png',
  'https://files.dstn.to/d299276a6f368be9.png',
  'https://files.dstn.to/0442e8cf8961b45c.png',
  'https://files.dstn.to/f77c9cd23fa0743c.png',
  'https://files.dstn.to/c9ef9cc99bed226c.png'
];

export async function getRecentGmers(): Promise<User[]> {
  const data = await fetch(`${API_HOST}/recents`).then((r) => r.json());
  for await (const post of data.data) post.creator.avatar = avatars[Math.floor(Math.random() * avatars.length)];
  return data.data.reverse();
}

export async function getTopGmers(): Promise<User[]> {
  const data = await fetch(`${API_HOST}/top`).then((r) => r.json());
  for await (const post of data.data) post.avatar = avatars[Math.floor(Math.random() * avatars.length)];
  return data.data;
}

export async function getOfficialTopGmers(): Promise<User[]> {
  const data = await fetch(`${API_HOST}/top/official`).then((r) => r.json());
  for await (const post of data.data) post.avatarUrl = avatars[Math.floor(Math.random() * avatars.length)];
  return data.data;
}

export async function getUser(username: string): Promise<User & { last_post: Post }> {
  if (!username) return;
  const data = await fetch(`${API_HOST}/username/${username}`).then((r) => r.json());
  return { ...data.data.user, last_post: data.data.last_post };
}
