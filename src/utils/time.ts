export function timeSince(date: Date, small?: boolean) {
  let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + `${small ? 'y' : ' years'}`;
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + `${small ? 'M' : ' months'}`;
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + `${small ? 'd' : ' days'}`;
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + `${small ? 'h' : ' hours'}`;
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + `${small ? 'm' : ' minutes'}`;
  return Math.floor(seconds) + `${small ? 's' : ' seconds'}`;
}