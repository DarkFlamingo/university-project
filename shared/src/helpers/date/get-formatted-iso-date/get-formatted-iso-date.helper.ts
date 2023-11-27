import { formatISO } from 'date-fns';

const getFormattedISODate = (date: Date): string => formatISO(date);

export { getFormattedISODate };
