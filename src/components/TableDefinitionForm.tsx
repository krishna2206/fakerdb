import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MAX_ROW_COUNT } from '@/services/singleTableService';
import { DatabaseType, FieldType, TableDefinition, TableField } from '@/types/types';
import {
  convertFieldType,
  databaseTypes,
  getDefaultLength,
  needsLength,
  supportsAutoIncrement
} from '@/utils/fieldTypes';
import { AlertCircle, HelpCircle, Lightbulb, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TableDefinitionFormProps {
  onSubmit: (tableDefinition: TableDefinition, rowCount: number) => void;
  isLoading: boolean;
}

const TableDefinitionForm: React.FC<TableDefinitionFormProps> = ({ onSubmit, isLoading }) => {
  const [tableName, setTableName] = useState('');
  const [rowCount, setRowCount] = useState(10);
  const [databaseType, setDatabaseType] = useState<DatabaseType>("MySQL");
  const [contextDescription, setContextDescription] = useState<string>('');
  const [fields, setFields] = useState<TableField[]>([
    {
      id: uuidv4(),
      name: 'id',
      type: 'INT',
      primaryKey: true,
      autoIncrement: true,
      nullable: false,
      description: 'Primary key'
    }
  ]);

  // Count primary key fields to identify compound keys
  const primaryKeyFields = fields.filter(field => field.primaryKey);
  const hasCompoundPrimaryKey = primaryKeyFields.length > 1;

  // Convert field types when database type changes, handle potential incompatibilities
  useEffect(() => {
    const updatedFields = fields.map(field => {
      const convertedType = convertFieldType(field.type, databaseType);
      
      if (convertedType !== field.type) {
        const updatedField = {
          ...field,
          type: convertedType,
          length: needsLength(convertedType) ? 
            field.length || getDefaultLength(convertedType) : 
            undefined,
          autoIncrement: supportsAutoIncrement(convertedType) ? 
            field.autoIncrement : 
            false
        };

        return updatedField;
      }
      
      return field;
    });

    setFields(updatedFields);
  }, [databaseType]);

  const handleAddField = () => {
    setFields([...fields, {
      id: uuidv4(),
      name: '',
      type: 'VARCHAR',
      length: 255,
      primaryKey: false,
      autoIncrement: false,
      nullable: true,
      description: ''
    }]);
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleFieldChange = (id: string, field: Partial<TableField>) => {
    setFields(fields.map(f => {
      if (f.id === id) {
        // If setting a field as primary key, also make it non-nullable
        if (field.primaryKey === true) {
          return { ...f, ...field, nullable: false };
        }
        return { ...f, ...field };
      }
      return f;
    }));
  };

  const handleTypeChange = (id: string, type: FieldType) => {
    const field = fields.find(f => f.id === id);
    if (field) {
      // Set default length if the field type needs length
      const updatedField = { 
        ...field, 
        type,
        length: needsLength(type) ? getDefaultLength(type) : undefined
      };
      
      // If changing to a type that doesn't support auto-increment, disable it
      if (field.autoIncrement && !supportsAutoIncrement(type)) {
        updatedField.autoIncrement = false;
      }
      
      handleFieldChange(id, updatedField);
    }
  };

  const handleDatabaseTypeChange = (value: DatabaseType) => {
    setDatabaseType(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tableDefinition: TableDefinition = {
      name: tableName,
      fields: fields,
      databaseType: databaseType,
      contextDescription: contextDescription || undefined
    };
    onSubmit(tableDefinition, rowCount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Define Your Table</CardTitle>
        <CardDescription>Configure your table structure for data generation</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tableName">Table Name</Label>
                <Input
                  id="tableName"
                  value={tableName}
                  onChange={e => setTableName(e.target.value)}
                  placeholder="e.g., users, products"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="databaseType">Database Type</Label>
                <Select
                  value={databaseType}
                  onValueChange={handleDatabaseTypeChange}
                >
                  <SelectTrigger id="databaseType">
                    <SelectValue placeholder="Select database" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MySQL">MySQL</SelectItem>
                    <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                    <SelectItem value="SQLite">SQLite</SelectItem>
                    <SelectItem value="Oracle">Oracle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rowCount">Number of Rows</Label>
                  <span className="text-xs text-muted-foreground">Max: {MAX_ROW_COUNT}</span>
                </div>
                <Input
                  id="rowCount"
                  type="number"
                  min={1}
                  max={MAX_ROW_COUNT}
                  value={rowCount}
                  onChange={e => setRowCount(Number(e.target.value))}
                  required
                />
                {rowCount > MAX_ROW_COUNT && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-amber-500">
                    <AlertCircle className="h-3 w-3" />
                    <span>Value will be capped at {MAX_ROW_COUNT} rows to prevent abuse.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Context Description Section */}
          <div className="w-full border-t pt-4">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-4 w-4" />
              <h3 className="text-sm font-medium">Context for AI Generation</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contextDescription">
                Context Description <span className="text-xs text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="contextDescription"
                placeholder="Describe the purpose of this table and any specific requirements for data generation..."
                className="min-h-[120px]"
                value={contextDescription}
                onChange={e => setContextDescription(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Providing context helps the AI generate more relevant and accurate data.
                For example: "This is a users table for a social media app targeting young professionals."
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Fields</h3>
              
              {/* Show compound primary key information if present */}
              {hasCompoundPrimaryKey && (
                <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  <span>Compound primary key detected ({primaryKeyFields.length} fields)</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div 
                  key={field.id} 
                  className={`rounded-lg border p-4 space-y-4 ${field.primaryKey ? 'border-primary border-2' : ''}`}
                >
                  {/* Compound primary key indicator */}
                  {field.primaryKey && hasCompoundPrimaryKey && (
                    <div className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary mb-2">
                      Part of compound primary key
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`field-name-${field.id}`}>Name</Label>
                      <Input
                        id={`field-name-${field.id}`}
                        value={field.name}
                        onChange={e => handleFieldChange(field.id, { name: e.target.value })}
                        placeholder="Field name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`field-type-${field.id}`}>Type</Label>
                      <Select
                        value={field.type}
                        onValueChange={(value: FieldType) => handleTypeChange(field.id, value)}
                      >
                        <SelectTrigger id={`field-type-${field.id}`}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {databaseTypes[databaseType].map(type => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {needsLength(field.type) && (
                      <div className="space-y-2">
                        <Label htmlFor={`field-length-${field.id}`}>Length</Label>
                        <Input
                          id={`field-length-${field.id}`}
                          type="number"
                          min={1}
                          value={field.length || getDefaultLength(field.type)}
                          onChange={e => handleFieldChange(field.id, { length: Number(e.target.value) })}
                          required
                        />
                      </div>
                    )}
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor={`field-desc-${field.id}`}>Description</Label>
                      <Input
                        id={`field-desc-${field.id}`}
                        value={field.description}
                        onChange={e => handleFieldChange(field.id, { description: e.target.value })}
                        placeholder="Optional description"
                      />
                    </div>
                  </div>
                  
                  {/* Field Context Hint */}
                  <div className="space-y-2">
                    <Label htmlFor={`field-context-${field.id}`}>
                      Context Hint <span className="text-xs text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id={`field-context-${field.id}`}
                      value={field.contextHint || ''}
                      onChange={e => handleFieldChange(field.id, { contextHint: e.target.value })}
                      placeholder="Additional context to guide AI data generation for this field"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`field-pk-${field.id}`}
                        checked={field.primaryKey}
                        onCheckedChange={checked => 
                          handleFieldChange(field.id, { primaryKey: Boolean(checked) })
                        }
                      />
                      <Label htmlFor={`field-pk-${field.id}`} className="flex items-center">
                        Primary Key
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-80">
                              <p>Primary keys uniquely identify each record in a table.</p>
                              <p className="mt-1">When multiple fields are marked as primary keys, they form a compound primary key, where the combination of values must be unique.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                    </div>
                    
                    {/* Only show auto-increment for supported field types */}
                    {supportsAutoIncrement(field.type) && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`field-ai-${field.id}`}
                          checked={field.autoIncrement}
                          onCheckedChange={checked => 
                            handleFieldChange(field.id, { autoIncrement: Boolean(checked) })
                          }
                        />
                        <Label htmlFor={`field-ai-${field.id}`}>Auto Increment</Label>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Label 
                        htmlFor={`field-null-${field.id}`}
                        className={field.primaryKey ? "text-muted-foreground" : ""}
                      >
                        Nullable
                        {field.primaryKey && (
                          <span className="ml-1 text-xs text-muted-foreground italic">(PK must be not null)</span>
                        )}
                      </Label>
                      <Switch
                        id={`field-null-${field.id}`}
                        checked={field.nullable}
                        onCheckedChange={checked => 
                          handleFieldChange(field.id, { nullable: checked })
                        }
                        disabled={field.primaryKey}
                        className={field.primaryKey ? "opacity-50" : ""}
                      />
                    </div>
                  </div>
                  
                  {fields.length === 1 && field.autoIncrement && (
                    <div className="flex items-center gap-2 mt-2 text-amber-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>Auto-increment is unnecessary when there's only one field. Please use another type / disable auto increment / add another field.</span>
                    </div>
                  )}

                  {fields.length > 1 && (
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveField(field.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1 text-destructive" />
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button 
              type="button" 
              variant="outline" 
              size="default"
              onClick={handleAddField}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Field
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Data...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate SQL Data
              </>)
            }
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TableDefinitionForm;
