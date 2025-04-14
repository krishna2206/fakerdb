import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { TableDefinition, TableRowData } from '@/types/types';
import { Download } from 'lucide-react';
import React from 'react';

interface DataPreviewProps {
  tableDefinition: TableDefinition;
  data: TableRowData[] | string[];
  insertDataSQL: string;
}

const DataPreview: React.FC<DataPreviewProps> = ({ tableDefinition, data, insertDataSQL }) => {
  if (!data.length) {
    return null;
  }
  
  const handleDownload = (sql: string, fileName: string) => {
    const blob = new Blob([sql], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-auto max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                {tableDefinition.fields.map(field => (
                  <TableHead key={field.id}>
                    {field.name}
                    <div className="text-xs text-muted-foreground">{field.type}</div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(0, 10).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {tableDefinition.fields.map(field => (
                    <TableCell key={`${rowIndex}-${field.id}`}>
                      {formatCellValue(row[field.name], field.type)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {data.length > 10 && (
          <div className="space-y-4 mt-4">
            <div className="text-center text-sm text-muted-foreground">
              Showing 10 of {data.length} rows
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => handleDownload(insertDataSQL, `${tableDefinition.name}_insert_data.sql`)}
              >
                <Download className="h-4 w-4" />
                Download Full Data as SQL
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function formatCellValue(value: string | number | boolean | null | undefined, type: string): React.ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground italic">NULL</span>;
  }
  
  switch (type) {
    case 'JSON':
      try {
        const jsonValue = typeof value === 'string' ? JSON.parse(value) : value;
        return <span className="font-mono text-xs">{JSON.stringify(jsonValue, null, 2)}</span>;
      } catch {
        return String(value);
      }
    case 'BOOLEAN':
      return value ? 'true' : 'false';
    default:
      return String(value);
  }
}

export default DataPreview;
