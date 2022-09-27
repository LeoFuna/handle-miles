import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string, pattern: string ): string {
  return format(parseISO(dateString), pattern);
}
