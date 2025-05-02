import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { convertSQLToCSV, downloadCSV, downloadMultipleCSVAsZip } from "@/services/csvExportService";
import { refineSQLWithGemini } from "@/services/sqlRefinementService";
import { DatabaseType, Project } from "@/types/types";
import { Copy, Download, FileCode, FileSpreadsheet, Loader2, WandSparkles } from "lucide-react";
import React, { useState } from "react";
import SQLHighlighter from "./SQLHighlighter";

interface SQLDisplayProps {
  createTableSQL: string;
  insertDataSQL: string;
  databaseType: DatabaseType;
  project?: Project;
}

const SQLDisplay: React.FC<SQLDisplayProps> = ({
  createTableSQL,
  insertDataSQL,
  databaseType,
  project,
}) => {
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("create");
  const [refinedCreateSQL, setRefinedCreateSQL] = useState<string | null>(null);
  const [refinedInsertSQL, setRefinedInsertSQL] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCopy = (sql: string, type: string) => {
    navigator.clipboard.writeText(sql);
    toast({
      title: "Copied to clipboard",
      description: `${type} SQL has been copied to clipboard.`,
      duration: 2000,
    });
  };

  const handleDownload = (sql: string, fileName: string) => {
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

  const handleRefineSQL = async () => {
    setIsRefining(true);
    try {
      if (activeTab === "create") {
        const sqlToRefine = refinedCreateSQL || createTableSQL;
        const refinedSQL = await refineSQLWithGemini(
          sqlToRefine,
          "create",
          databaseType,
          project
        );
        setRefinedCreateSQL(refinedSQL);
      } else {
        const sqlToRefine = refinedInsertSQL || insertDataSQL;
        const refinedSQL = await refineSQLWithGemini(
          sqlToRefine,
          "insert",
          databaseType,
          project
        );
        setRefinedInsertSQL(refinedSQL);
      }

      toast({
        title: "SQL refined successfully",
        description:
          "The SQL has been refined to fix syntax issues and improve structure.",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error refining SQL",
        description:
          error instanceof Error
            ? error.message
            : "There was an error refining the SQL. Please try again.",
        duration: 2000,
        variant: "destructive",
      });
    } finally {
      setIsRefining(false);
    }
  };

  const handleCSVExport = async () => {
    setIsExporting(true);
    try {
      const currentSQL = getCurrentSQL("insert");
      
      const csvByTable = await convertSQLToCSV(currentSQL, databaseType, project);
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
        await downloadMultipleCSVAsZip(csvByTable, project?.name || "fakerdb_export");

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
        description: error instanceof Error ? error.message : "Failed to export data to CSV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getCurrentSQL = (tab: string) => {
    if (tab === "create") {
      return refinedCreateSQL || createTableSQL;
    } else {
      return refinedInsertSQL || insertDataSQL;
    }
  };

  const className = project ? "w-full h-full flex flex-col" : "w-full flex flex-col";

  return (
    <Card className={className}>
      <CardHeader className="flex-shrink-0">
        <CardTitle>Generated SQL</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={(tab) => {
            if (!isRefining) {
              setActiveTab(tab);
            }
          }}
          className="w-full h-full flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
            <TabsTrigger value="create" disabled={isRefining}>
              Create Table
            </TabsTrigger>
            <TabsTrigger value="insert" disabled={isRefining}>
              Insert Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4 flex-1 overflow-hidden">
            <div className="relative h-full">
              <div className="absolute right-2 top-2 flex gap-2 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleCopy(getCurrentSQL("create"), "Create Table")
                  }
                  disabled={isRefining}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleDownload(getCurrentSQL("create"), "create_table.sql")
                  }
                  disabled={isRefining}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefineSQL}
                  disabled={isRefining}
                  title="Refine SQL to fix eventual syntax errors"
                >
                  {isRefining ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <WandSparkles className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {isRefining && activeTab === "create" ? (
                <div className="p-4 bg-muted rounded-md text-sm mt-2 h-[calc(100%-2rem)] flex items-center justify-center flex-col gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p>Refining SQL...</p>
                </div>
              ) : (
                <div className="h-[calc(100%-2rem)] overflow-auto mt-2">
                  <SQLHighlighter sql={getCurrentSQL("create")} />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="insert" className="space-y-4 flex-1 overflow-hidden">
            <div className="relative h-full">
              <div className="absolute right-2 top-2 flex gap-2 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleCopy(getCurrentSQL("insert"), "Insert Data")
                  }
                  disabled={isRefining || isExporting}
                >
                  <Copy className="h-4 w-4" />
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={isRefining || isExporting}
                      title="Download options"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2">
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDownload(getCurrentSQL("insert"), "insert_data.sql")
                        }
                        className="justify-start"
                        disabled={isRefining || isExporting}
                      >
                        <FileCode className="h-4 w-4 mr-2" />
                        Export as SQL
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsDialogOpen(true)}
                        className="justify-start"
                        disabled={isRefining || isExporting}
                      >
                        {isExporting ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                        )}
                        Export as CSV
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefineSQL}
                  disabled={isRefining || isExporting}
                  title="Refine SQL to fix eventual syntax errors"
                >
                  {isRefining ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <WandSparkles className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {isRefining && activeTab === "insert" ? (
                <div className="p-4 bg-muted rounded-md text-sm mt-2 h-[calc(100%-2rem)] flex items-center justify-center flex-col gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p>Refining SQL...</p>
                </div>
              ) : isExporting ? (
                <div className="p-4 bg-muted rounded-md text-sm mt-2 h-[calc(100%-2rem)] flex items-center justify-center flex-col gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p>Preparing CSV export...</p>
                </div>
              ) : (
                <div className="h-[calc(100%-2rem)] overflow-auto mt-2">
                  <SQLHighlighter sql={getCurrentSQL("insert")} />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm CSV Export</AlertDialogTitle>
            <AlertDialogDescription>
              Exporting data as CSV will cost additional tokens. Do you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCSVExport}>Proceed</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default SQLDisplay;
