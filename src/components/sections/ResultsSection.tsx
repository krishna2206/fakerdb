import DataPreview from '@/components/DataPreview';
import SQLDisplay from '@/components/SQLDisplay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { GeneratedData, TableDefinition } from '@/types/types';
import { AlertCircle } from 'lucide-react';

interface ResultsSectionProps {
  error: string | null;
  generatedData: GeneratedData | null;
  tableDefinition: TableDefinition | null;
  showResults: boolean;
}

export default function ResultsSection({
  error,
  generatedData,
  tableDefinition,
  showResults
}: ResultsSectionProps) {
  return (
    <>
      {error && (
        <Alert variant="error">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {generatedData && tableDefinition && (
        <section 
          className={`space-y-8 transition-all duration-300 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <SQLDisplay 
            createTableSQL={generatedData.createTableSQL} 
            insertDataSQL={generatedData.insertDataSQL} 
            databaseType={tableDefinition.databaseType}
          />
          
          <DataPreview 
            tableDefinition={tableDefinition} 
            data={generatedData.rawData}
            insertDataSQL={generatedData.insertDataSQL}
          />
        </section>
      )}
    </>
  );
}