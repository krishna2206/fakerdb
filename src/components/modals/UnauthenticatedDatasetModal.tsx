import SQLHighlighter from "@/components/SQLHighlighter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { DatabaseType, GeneratedData } from "@/types/types";
import { handleCopySql, handleCsvExport, handleDownloadSql } from "@/utils/sqlHandlers";
import { Check, Copy, Download, FileSpreadsheet, Loader2 } from "lucide-react";
import { useState } from "react";

interface UnauthenticatedDatasetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  generatedSQL: GeneratedData | null;
  databaseType?: DatabaseType;
}

export default function UnauthenticatedDatasetModal({
  open,
  onOpenChange,
  generatedSQL,
  databaseType,
}: UnauthenticatedDatasetModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("create");
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean }>({});
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Check if we have actual SQL content to show
  const hasContent = !!(
    generatedSQL?.createTableSQL && generatedSQL?.insertDataSQL
  );
  const createTableSQL = generatedSQL?.createTableSQL || "";
  const insertDataSQL = generatedSQL?.insertDataSQL || "";

  const handleCopy = (sql: string, type: string) => {
    handleCopySql(sql, type, setCopyStatus, copyStatus);
  };

  const handleDownload = (sql: string, fileName: string) => {
    handleDownloadSql(sql, fileName);
  };

  const handleCSVExport = async () => {
    if (!generatedSQL?.insertDataSQL) return;
    await handleCsvExport(
      insertDataSQL,
      null,
      setIsExporting
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Generated SQL</DialogTitle>
          <DialogDescription>
            {hasContent
              ? `Your ${databaseType} database SQL has been generated. You can view, copy, or download it.`
              : "No SQL content is available to display."}
          </DialogDescription>
        </DialogHeader>

        {!hasContent ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-6">
              <p className="text-muted-foreground mb-4">
                There was a problem generating SQL content.
              </p>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-hidden">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full h-full flex flex-col"
              >
                <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
                  <TabsTrigger value="create" disabled={isExporting}>Create Table SQL</TabsTrigger>
                  <TabsTrigger value="insert" disabled={isExporting}>Insert Data SQL</TabsTrigger>
                </TabsList>

                <TabsContent
                  value="create"
                  className="space-y-4 mt-4 flex-1 overflow-hidden"
                >
                  <div className="relative h-full rounded-md bg-background">
                    <div className="absolute right-4 top-4 flex gap-2 z-10">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleCopy(createTableSQL, "Create Table")
                        }
                      >
                        {copyStatus["Create Table"] ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleDownload(createTableSQL, "create_table.sql")
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="h-full overflow-auto mt-2 pb-10">
                      <SQLHighlighter
                        sql={createTableSQL}
                        highlightedLines={[]}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                  </div>
                </TabsContent>

                <TabsContent
                  value="insert"
                  className="space-y-4 mt-4 flex-1 overflow-hidden"
                >
                  <div className="relative h-full rounded-md bg-background">
                    <div className="absolute right-4 top-4 flex gap-2 z-10">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopy(insertDataSQL, "Insert Data")}
                        disabled={isExporting}
                      >
                        {copyStatus["Insert Data"] ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleDownload(insertDataSQL, "insert_data.sql")
                        }
                        disabled={isExporting}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCSVExport}
                        disabled={isExporting}
                        title="Export as CSV"
                      >
                        {isExporting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <FileSpreadsheet className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {isExporting ? (
                      <div className="p-4 bg-muted rounded-md text-sm mt-2 h-full flex items-center justify-center flex-col gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p>Preparing CSV export...</p>
                      </div>
                    ) : (
                      <div className="h-full overflow-auto mt-2 pb-10">
                        <SQLHighlighter
                          sql={insertDataSQL}
                          highlightedLines={[]}
                        />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
