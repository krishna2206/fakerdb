import { format } from "date-fns";

export const dateFormatOptions = [
  { value: "YYYY-MM-DD", label: "ISO Date (YYYY-MM-DD)" },
  { value: "MM/DD/YYYY", label: "US Format (MM/DD/YYYY)" },
  { value: "DD/MM/YYYY", label: "European Format (DD/MM/YYYY)" },
  { value: "YYYY-MM-DD HH:MM:SS", label: "Timestamp (YYYY-MM-DD HH:MM:SS)" },
  { value: "UNIX_TIMESTAMP", label: "Unix Timestamp" },
];

export const getDateFormatOptions = () => {
  return dateFormatOptions;
};

/**
 * Format date for display/context hint based on the selected format
 */
export const formatDateForDisplay = (
  date: Date | undefined,
  formatStr: string
): string => {
  if (!date) return "";

  switch (formatStr) {
    case "MM/DD/YYYY":
      return format(date, "MM/dd/yyyy");
    case "DD/MM/YYYY":
      return format(date, "dd/MM/yyyy");
    case "YYYY-MM-DD HH:MM:SS":
      return format(date, "yyyy-MM-dd HH:mm:ss");
    case "UNIX_TIMESTAMP":
      return Math.floor(date.getTime() / 1000).toString();
    case "YYYY-MM-DD":
    default:
      return format(date, "yyyy-MM-dd");
  }
};

/**
 * Generate example date values between start and end dates
 */
export const generateExampleDateValues = (
  start: Date,
  end: Date,
  formatStr: string
): string[] => {
  const result: string[] = [];
  const range = end.getTime() - start.getTime();

  for (let i = 0; i < 4; i++) {
    const randomTime = start.getTime() + Math.random() * range;
    const randomDate = new Date(randomTime);
    result.push(formatDateForDisplay(randomDate, formatStr));
  }

  return result;
};

/**
 * Generate default date ranges
 */
export const getDefaultDateRanges = (): Record<
  string,
  { startDate: Date; endDate: Date }
> => {
  const now = new Date();

  return {
    "Last 30 Days": {
      startDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      endDate: now,
    },
    "Last 90 Days": {
      startDate: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
      endDate: now,
    },
    "Last Year": {
      startDate: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
      endDate: now,
    },
    "Custom Range": {
      startDate: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
      endDate: now,
    },
  };
};
