import { toast } from "@/components/ui/use-toast";
import {
  convertSQLToCSV,
  downloadCSV,
  downloadMultipleCSVAsZip,
} from "@/services/csvExportService";
import { Project } from "@/types/types";

/**
 * Copy SQL text to clipboard
 * @param sql SQL string to copy
 * @param type Description of SQL type for toast message
 * @param setCopyStatus State setter function to update copy status
 * @param copyStatus Current copy status object
 * @returns Updated copy status
 */
export const handleCopySql = (
  sql: string,
  type: string,
  setCopyStatus: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >,
  copyStatus: { [key: string]: boolean }
) => {
  navigator.clipboard.writeText(sql);

  // Set copy status to show checkmark
  const newCopyStatus = { ...copyStatus, [type]: true };
  setCopyStatus(newCopyStatus);

  // Reset the copy status after a delay
  setTimeout(() => {
    setCopyStatus((prev) => ({ ...prev, [type]: false }));
  }, 2000);

  toast({
    title: "Copied to clipboard",
    description: `${type} SQL has been copied to clipboard.`,
    duration: 2000,
  });

  return newCopyStatus;
};

/**
 * Download SQL as a file
 * @param sql SQL string to download
 * @param fileName Name of the file to download
 */
export const handleDownloadSql = (sql: string, fileName: string) => {
  const blob = new Blob([sql], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  toast({
    title: "SQL file downloaded",
    description: `${fileName} has been downloaded.`,
    duration: 2000,
  });
};

/**
 * Export SQL data to CSV format
 * @param insertSQL SQL insert statements to convert to CSV
 * @param databaseType Type of database (MySQL, PostgreSQL, etc.)
 * @param project Optional project info for naming the export
 * @param setIsExporting State setter to manage export loading state
 */
export const handleCsvExport = async (
  insertSQL: string,
  project?: Project | null,
  setIsExporting?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!insertSQL) return;

  if (setIsExporting) setIsExporting(true);
  try {
    const csvByTable = await convertSQLToCSV(insertSQL);
    const tableCount = Object.keys(csvByTable).length;

    if (tableCount === 0) {
      toast({
        title: "No data to export",
        description: "There is no valid data to export to CSV.",
        variant: "destructive",
      });
      return;
    }

    if (tableCount === 1) {
      const tableName = Object.keys(csvByTable)[0];
      const csvContent = csvByTable[tableName];
      const fileName = `${tableName}_data.csv`;

      downloadCSV(csvContent, fileName);

      toast({
        title: "CSV Downloaded",
        description: `${fileName} has been downloaded.`,
        duration: 2000,
      });
    } else {
      const exportName = project?.name || "fakerdb_export";
      await downloadMultipleCSVAsZip(csvByTable, exportName);

      toast({
        title: "CSV Export Complete",
        description: `Exported ${tableCount} tables as ZIP archive.`,
        duration: 2000,
      });
    }
  } catch (error) {
    console.error("Error exporting to CSV:", error);
    toast({
      title: "Export failed",
      description:
        error instanceof Error
          ? error.message
          : "Failed to export data to CSV. Please try again.",
      variant: "destructive",
    });
  } finally {
    if (setIsExporting) setIsExporting(false);
  }
};
