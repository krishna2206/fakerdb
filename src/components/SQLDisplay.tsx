import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { DatabaseType, Project } from "@/types/types";
import { refineSQLWithGemini } from "@/utils/sqlRefinementUtils";
import { Copy, Download, Loader2, WandSparkles } from "lucide-react";
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

  // Get the current SQL based on active tab and refinement status
  const getCurrentSQL = (tab: string) => {
    if (tab === "create") {
      return refinedCreateSQL || createTableSQL;
    } else {
      return refinedInsertSQL || insertDataSQL;
    }
  };

  const className = project ? "w-full h-full flex flex-col" : "w-full flex flex-col"

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
                  disabled={isRefining}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleDownload(getCurrentSQL("insert"), "insert_data.sql")
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
              {isRefining && activeTab === "insert" ? (
                <div className="p-4 bg-muted rounded-md text-sm mt-2 h-[calc(100%-2rem)] flex items-center justify-center flex-col gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p>Refining SQL...</p>
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
    </Card>
  );
};

export default SQLDisplay;
