import SQLHighlighter from "@/components/SQLHighlighter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { getDataset, getProjectDatasets, updateDataset } from "@/services/datasetService";
import { editSQLWithAI } from "@/services/sqlEditService";
import { Dataset, Project } from "@/types/types";
import { handleCopySql, handleCsvExport, handleDownloadSql } from "@/utils/sqlHandlers";
import { ArrowLeft, ArrowUp, Check, Copy, Database, Download, FileSpreadsheet, Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface DatasetViewProps {
  project: Project;
  datasetId?: string;
  onDatasetUpdated?: () => void;
}

export const DatasetView: React.FC<DatasetViewProps> = ({ project, datasetId, onDatasetUpdated }) => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("create");
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean }>({});
  const [prompt, setPrompt] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [highlightedLines, setHighlightedLines] = useState<{
    create: number[];
    insert: number[];
  }>({ create: [], insert: [] });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { toast } = useToast();

  // Fetch all project datasets
  useEffect(() => {
    const fetchDatasets = async () => {
      if (!project?.id) return;

      setIsLoading(true);
      try {
        const projectDatasets = await getProjectDatasets(project.id);
        setDatasets(projectDatasets);

        // If no datasetId is provided, select the first dataset (if available)
        if (!datasetId && projectDatasets.length > 0) {
          setSelectedDataset(projectDatasets[0]);
        }
      } catch (error) {
        console.error("Error fetching datasets:", error);
        toast({
          title: "Failed to load datasets",
          description: "There was a problem loading the datasets.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatasets();
  }, [project, datasetId, toast]);

  // Fetch specific dataset if datasetId is provided
  useEffect(() => {
    const fetchSpecificDataset = async () => {
      if (!datasetId) return;

      setIsLoading(true);
      try {
        const dataset = await getDataset(datasetId);
        setSelectedDataset(dataset);
        // Clear highlighted lines when switching datasets
        setHighlightedLines({ create: [], insert: [] });
      } catch (error) {
        console.error(`Error fetching dataset ${datasetId}:`, error);
        toast({
          title: "Failed to load dataset",
          description: "There was a problem loading the specified dataset.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecificDataset();
  }, [datasetId, toast]);

  const handleCopy = (sql: string, type: string) => {
    handleCopySql(sql, type, setCopyStatus, copyStatus);
  };

  const handleDownload = (sql: string, fileName: string) => {
    handleDownloadSql(sql, fileName);
  };

  const handleCSVExport = async () => {
    if (!selectedDataset) return;
    await handleCsvExport(
      selectedDataset.insertDataSQL,
      project,
      setIsExporting
    );
  };

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isProcessing || !selectedDataset) return;

    setIsProcessing(true);

    try {
      // Determine which SQL to edit based on the active tab
      const sqlType = activeTab as 'create' | 'insert';
      const currentSQL = sqlType === 'create' 
        ? selectedDataset.createTableSQL 
        : selectedDataset.insertDataSQL;

      const result = await editSQLWithAI(
        project,
        sqlType,
        currentSQL,
        prompt,
        project.databaseType || 'MySQL'
      );

      const updatedDataset = { 
        ...selectedDataset,
        ...(sqlType === 'create' 
          ? { createTableSQL: result.updatedSQL } 
          : { insertDataSQL: result.updatedSQL })
      };

      await updateDataset(updatedDataset.id, updatedDataset);

      setSelectedDataset(updatedDataset);

      setDatasets(prev => 
        prev.map(ds => ds.id === updatedDataset.id ? updatedDataset : ds)
      );

      setHighlightedLines(prev => ({
        ...prev,
        [sqlType]: result.modifiedLines
      }));

      toast({
        title: "SQL Updated",
        description: `Your ${sqlType === 'create' ? 'schema' : 'data'} has been updated successfully.`,
        variant: "default"
      });
      
      // Notify parent component that dataset has been updated
      if (onDatasetUpdated) {
        onDatasetUpdated();
      }
    } catch (error) {
      console.error("Error updating SQL:", error);
      toast({
        title: "Update failed",
        description: error instanceof Error 
          ? error.message 
          : "Failed to update SQL. Please try again.",
        variant: "destructive"
      });
    } finally {
      setPrompt("");
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full h-8 w-8"
          >
            <Link to="/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium">{project.name}</h1>
            <div className="bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded">
              {project.databaseType || "PostgreSQL"}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col overflow-hidden">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading datasets...</p>
            </div>
          </div>
        ) : datasets.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-6">
              <Database className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium">No datasets found</h3>
              <p className="text-muted-foreground mt-2">
                Generate some data from the diagram view to get started.
              </p>
            </div>
          </div>
        ) : selectedDataset ? (
          <div className="flex flex-col h-full">
            <div className="w-full mb-4">
              <Tabs
                value={activeTab}
                onValueChange={isProcessing ? undefined : setActiveTab}
                className="w-full flex flex-col"
              >
                <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
                  <TabsTrigger value="create" disabled={isExporting || isProcessing}>
                    Create Table SQL
                  </TabsTrigger>
                  <TabsTrigger value="insert" disabled={isExporting || isProcessing}>
                    Insert Data SQL
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="space-y-4 mt-4">
                  <div className={cn(
                    "relative h-[calc(100vh-280px)] rounded-md bg-background",
                    isProcessing && "opacity-80 pointer-events-none"
                  )}>
                    {isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 bg-background/60 backdrop-blur-[1px]">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          <p className="text-sm font-medium">Updating schema with AI...</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute right-4 top-4 flex gap-2 z-10">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopy(selectedDataset.createTableSQL, "Create Table")}
                        disabled={isExporting || isProcessing}
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
                        onClick={() => handleDownload(selectedDataset.createTableSQL, "create_table.sql")}
                        disabled={isExporting || isProcessing}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="h-full overflow-auto mt-2">
                      <SQLHighlighter 
                        sql={selectedDataset.createTableSQL} 
                        highlightedLines={highlightedLines.create} 
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                  </div>
                </TabsContent>

                <TabsContent value="insert" className="space-y-4 mt-4">
                  <div className={cn(
                    "relative h-[calc(100vh-280px)] rounded-md bg-background",
                    isProcessing && "opacity-80 pointer-events-none"
                  )}>
                    {isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 bg-background/60 backdrop-blur-[1px]">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          <p className="text-sm font-medium">Updating data with AI...</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute right-4 top-4 flex gap-2 z-10">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopy(selectedDataset.insertDataSQL, "Insert Data")}
                        disabled={isExporting || isProcessing}
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
                        onClick={() => handleDownload(selectedDataset.insertDataSQL, "insert_data.sql")}
                        disabled={isExporting || isProcessing}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCSVExport}
                        disabled={isExporting}
                        size="icon"
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
                      <div className="h-full overflow-auto mt-2">
                        <SQLHighlighter 
                          sql={selectedDataset.insertDataSQL} 
                          highlightedLines={highlightedLines.insert}
                        />
                      </div>
                    )}
                    {!isExporting && (
                      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6">
              <Database className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium">No dataset selected</h3>
              <p className="text-muted-foreground mt-2">
                Please select the first dataset
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Chat input */}
      <div className="pb-4 flex justify-center">
        <div className="w-full max-w-2xl space-y-3">
          <div className={cn(
            "rounded-xl overflow-hidden shadow-sm transition-all duration-300 border border-border bg-card relative",
            isFocused && "border-primary shadow-[0_0_0_1px_hsl(var(--primary)/20%)]"
          )}>
            <form onSubmit={handleSendPrompt} className="flex flex-col">
              <div className="flex-1 p-3 bg-card">
                <Textarea
                  className="w-full border-0 bg-transparent ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-muted-foreground/60 min-h-[40px] resize-none outline-none text-sm overflow-hidden"
                  placeholder="Update your dataset with AI..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isProcessing}
                  ref={textareaRef}
                  rows={1}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isProcessing && prompt.trim()) {
                      e.preventDefault();
                      handleSendPrompt(e);
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="text-xs text-muted-foreground/80 pl-2 flex-1">
                  <span className="hidden sm:inline">Press Enter to send</span>
                </div>
                <Button
                  type="submit"
                  className="rounded-full h-8 w-8 p-0"
                  variant="default"
                  size="icon"
                  disabled={!prompt.trim() || isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};