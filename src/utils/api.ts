import { User } from "../types/Gateway";

export const API_HOST = 'https://gm-api.dstn.to';

export async function getTopGmers(): Promise<User[]> {
  const data = await fetch(`${API_HOST}/top`).then(r => r.json());
  return data.data;
}