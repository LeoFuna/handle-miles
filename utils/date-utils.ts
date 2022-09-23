import { fromUnixTime,format } from 'date-fns';

export function formatTimestampsToDate(timestampsSeconds: number, pattern: string ) {
  const dateTime = fromUnixTime(timestampsSeconds);
  const formatedDate = format(dateTime, pattern);

  return formatedDate;
} 