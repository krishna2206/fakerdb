/**
 * Format date to display as time ago (e.g., "5 minutes ago")
 * @param dateString ISO date string to format
 * @returns Formatted relative time string
 */
export const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Define time intervals
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;
  
  // Calculate the appropriate time ago format
  if (secondsAgo < minute) {
    return secondsAgo === 1 ? '1 second ago' : `${secondsAgo} seconds ago`;
  } else if (secondsAgo < hour) {
    const minutesAgo = Math.floor(secondsAgo / minute);
    return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`;
  } else if (secondsAgo < day) {
    const hoursAgo = Math.floor(secondsAgo / hour);
    return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`;
  } else if (secondsAgo < week) {
    const daysAgo = Math.floor(secondsAgo / day);
    return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
  } else if (secondsAgo < month) {
    const weeksAgo = Math.floor(secondsAgo / week);
    return weeksAgo === 1 ? '1 week ago' : `${weeksAgo} weeks ago`;
  } else if (secondsAgo < year) {
    const monthsAgo = Math.floor(secondsAgo / month);
    return monthsAgo === 1 ? '1 month ago' : `${monthsAgo} months ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / year);
    return yearsAgo === 1 ? '1 year ago' : `${yearsAgo} years ago`;
  }
};