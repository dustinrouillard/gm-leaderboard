import { Post, User } from "../types/Gateway";

export const API_HOST = "https://gm-api.dstn.to";

export async function getRecentGmers(): Promise<User[]> {
  const data = await fetch(`${API_HOST}/recents`).then((r) => r.json());
  return data.data.reverse();
}

export async function getTopGmers(): Promise<User[]> {
  const data = await fetch(`${API_HOST}/top`).then((r) => r.json());
  return data.data;
}

export async function getOfficialTopGmers(): Promise<User[]> {
  const data = await fetch(`${API_HOST}/top/official`).then((r) => r.json());
  return data.data;
}

export async function getUser(username: string): Promise<User & { last_post: Post }> {
  if (!username) return;
  const data = await fetch(`${API_HOST}/username/${username}`).then((r) => r.json());
  return { ...data.data.user, last_post: data.data.last_post };
}
