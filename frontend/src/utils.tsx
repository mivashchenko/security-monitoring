export const timeAgo = (date: number | Date) => {
  const dateObj = typeof date === "number" ? new Date(date) : date;
  const now = new Date();

  const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (seconds < 5) return "Just now";
  if (seconds < 30) return "A few seconds ago";
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 2) return "a minute ago";
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 2) return "An hour ago";
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days < 2) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 2) return "Last week";
  if (weeks < 4) return `${weeks} weeks ago`;

  const months = Math.floor(days / 30);
  if (months < 2) return "Last month";
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(days / 365);
  return years < 2 ? "Last year" : `${years} years ago`;
}

export const toHumanReadableDate = (date: Date) => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}