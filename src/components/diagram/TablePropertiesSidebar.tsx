import { Edge, Node } from "@xyflow/react";
import {
  AlertCircle,
  HelpCircle, Lightbulb, Plus,
  Trash,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

import { TemplateBadge } from "@/components/badges/TemplateBadge";
import { TemplateSelector } from "@/components/templates/TemplateSelector";
import {
  CompoundPrimaryKeyBadge,
  ForeignKeyBadge,
  PrimaryKeyBadge,
  ReferencedKeyBadge
} from "../badges/KeyBadges";

import { DatabaseType, FieldType, TableField, TemplateData, TemplateVariation } from "@/types/types";
import {
  convertFieldType,
  databaseTypes,
  getDefaultLength,
  needsLength,
  supportsAutoIncrement,
} from "@/utils/fieldTypesUtils";

interface TableNodeData {
  name: string;
  fields: TableField[];
  contextDescription?: string;
}

export interface TablePropertiesProps {
  node: Node;
  updateNodeData: (nodeId: string, data: TableNodeData) => void;
  removeNode: (nodeId: string) => void;
  onClose?: () => void;
  edges?: Edge[]; // Add edges to identify foreign key relationships
  nodes?: Node[]; // Add nodes to get table names for relationship info
  databaseType?: DatabaseType;
}

export default function TablePropertiesSidebar({
  node,
  updateNodeData,
  removeNode,
  onClose,
  edges = [],
  nodes = [],
  databaseType = "MySQL",
}: TablePropertiesProps) {
  const [tableName, setTableName] = useState((node.data.name as string) || "");
  const [fields, setFields] = useState<TableField[]>(
    (node.data.fields as TableField[]) || []
  );
  const [contextDescription, setContextDescription] = useState(
    (node.data.contextDescription as string) || ""
  );
  const { toast } = useToast();

  const primaryKeyFields = fields.filter((field) => field.primaryKey);
  const hasCompoundPrimaryKey = primaryKeyFields.length > 1;

  const hasTemplate = (field: TableField) => Boolean(field.template);

  const getForeignKeyInfo = (fieldName: string) => {
    // Find edges where this node and field are the target (receiving end of relationship)
    const foreignKeyEdges = edges.filter((edge) => {
      // Check if the targetHandle contains this field name (as the first item before the separator)
      if (!edge.targetHandle) return false;
      const targetField = edge.targetHandle.split("-")[0]; // Get field name as first item
      return edge.target === node.id && targetField === fieldName;
    });

    // Find edges where this node and field are the source (pointing to another table)
    const referenceEdges = edges.filter((edge) => {
      if (!edge.sourceHandle) return false;
      const sourceField = edge.sourceHandle.split("-")[0]; // Get field name as first item
      return edge.source === node.id && sourceField === fieldName;
    });

    const relationships = [
      ...foreignKeyEdges.map((edge) => {
        const sourceTable = nodes.find((n) => n.id === edge.source);
        const sourceField = edge.sourceHandle
          ? edge.sourceHandle.split("-")[0]
          : "Unknown";
        return {
          type: "foreignKey",
          relationshipType: edge.data?.relationship || "one-to-many",
          tableName: sourceTable?.data?.name || "Unknown",
          fieldName: sourceField,
        };
      }),
      ...referenceEdges.map((edge) => {
        const targetTable = nodes.find((n) => n.id === edge.target);
        const targetField = edge.targetHandle
          ? edge.targetHandle.split("-")[0]
          : "Unknown";
        return {
          type: "reference",
          relationshipType: edge.data?.relationship || "one-to-many",
          tableName: targetTable?.data?.name || "Unknown",
          fieldName: targetField,
        };
      }),
    ];

    return {
      isForeignKey: foreignKeyEdges.length > 0,
      isReference: referenceEdges.length > 0,
      isRelational: foreignKeyEdges.length > 0 || referenceEdges.length > 0,
      relationships,
    };
  };

  const handleTableNameChange = (newName: string) => {
    setTableName(newName);
    updateNodeData(node.id, {
      name: newName as string,
      fields,
      contextDescription,
    });
  };

  const handleContextDescriptionChange = (description: string) => {
    setContextDescription(description);
    updateNodeData(node.id, {
      name: tableName,
      fields,
      contextDescription: description,
    });
  };

  const addField = () => {
    // Choose a database-compatible field type for the new field
    const defaultType = databaseTypes[databaseType].includes("VARCHAR") 
      ? "VARCHAR" 
      : databaseTypes[databaseType].includes("TEXT") 
        ? "TEXT" 
        : databaseTypes[databaseType][0]; // First available type as fallback
        
    const newFields = [
      ...fields,
      {
        id: uuidv4(),
        name: `field_${fields.length + 1}`,
        type: defaultType as FieldType,
        primaryKey: false,
        nullable: true,
        length: needsLength(defaultType) ? getDefaultLength(defaultType) : undefined,
        contextHint: "",
        autoIncrement: false,
        description: "",
      },
    ];
    setFields(newFields);
    updateNodeData(node.id, {
      name: tableName,
      fields: newFields,
      contextDescription,
    });
  };

  const updateField = (index: number, updatedField: Partial<TableField>) => {
    const newFields = [...fields];
    const currentField = newFields[index];
    
    // Check if we're updating a field that's becoming part of a relationship
    const wasRelational = getForeignKeyInfo(currentField.name).isRelational;
    const willBeRelational = updatedField.name ? getForeignKeyInfo(updatedField.name).isRelational : wasRelational;

    // Only clear context hint and templates if becoming a foreign key relationship (but NOT a primary key)
    if (!wasRelational && willBeRelational && currentField.contextHint) {
      // Only clear if this is an actual foreign key relationship
      const isForeignKey = updatedField.name 
        ? getForeignKeyInfo(updatedField.name).isForeignKey 
        : getForeignKeyInfo(currentField.name).isForeignKey;
        
      if (isForeignKey) {
        updatedField.contextHint = "";
        updatedField.template = undefined;
        updatedField.templateVariation = undefined;
      }
    }

    // Create updated field with proper typing
    newFields[index] = { ...currentField, ...updatedField };

    // If setting a field as primary key, also make it non-nullable
    if (
      updatedField.primaryKey === true &&
      updatedField.primaryKey !== currentField.primaryKey
    ) {
      newFields[index].nullable = false;
    }

    // If changing to a type that doesn't support auto-increment, disable it
    if (
      currentField.autoIncrement &&
      updatedField.type &&
      !supportsAutoIncrement(updatedField.type)
    ) {
      newFields[index].autoIncrement = false;
    }

    setFields(newFields);
    updateNodeData(node.id, {
      name: tableName,
      fields: newFields,
      contextDescription,
    });
  };

  const handleTypeChange = (index: number, type: FieldType) => {
    const field = fields[index];
    if (field) {
      // Set default length if the field type needs length
      const updatedField: Partial<TableField> = {
        type,
        length: needsLength(type) ? getDefaultLength(type) : undefined,
      };

      // If changing to a type that doesn't support auto-increment, disable it
      if (field.autoIncrement && !supportsAutoIncrement(type)) {
        updatedField.autoIncrement = false;
      }

      updateField(index, updatedField);
    }
  };

  const removeField = (index: number) => {
    if (fields.length === 1) {
      toast({
        title: "Error",
        description: "Table must have at least one field",
        variant: "destructive",
      });
      return;
    }

    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    updateNodeData(node.id, {
      name: tableName,
      fields: newFields,
      contextDescription,
    });
  };

  const handleApplyTemplate = (index: number, template: TemplateData, variation?: TemplateVariation) => {
    const field = fields[index];
    if (field) {
      // Convert template field type to match the current database type
      const dbCompatibleFieldType = convertFieldType(template.fieldType, databaseType);
      
      // Set updated field with template information
      const updatedField: Partial<TableField> = {
        type: dbCompatibleFieldType,
        length: template.defaultLength || (needsLength(dbCompatibleFieldType) ? getDefaultLength(dbCompatibleFieldType) : undefined),
        contextHint: variation?.contextHint || template.variations[0]?.contextHint || field.contextHint,
        template: template,
        templateVariation: variation || template.variations[0]
      };
      
      updateField(index, updatedField);
    }
  };

  const handleRemoveTemplate = (index: number) => {
    const field = fields[index];
    if (field && field.template) {
      // Keep the context hint that was set by the template
      const { template, templateVariation, ...rest } = field;
      updateField(index, { template: undefined, templateVariation: undefined });
    }
  };

  // Effect to clear context hints when fields become part of a relationship due to diagram changes
  useEffect(() => {
    const updatedFields = [...fields];
    let hasChanges = false;

    // Check each field to see if it's become relational and has a context hint
    fields.forEach((field, index) => {
      // Get relationship info and specifically check if it's a foreign key (not just a primary key)
      const keyInfo = getForeignKeyInfo(field.name);
      
      // Only clear templates and context hints for foreign keys, not for primary keys or fields referenced by other tables
      if (keyInfo.isForeignKey && (field.contextHint || field.template)) {
        updatedFields[index] = {
          ...field,
          contextHint: "",
          template: undefined,
          templateVariation: undefined
        };
        hasChanges = true;
      }
    });

    // Only update the node data if changes were made
    if (hasChanges) {
      setFields(updatedFields);
      updateNodeData(node.id, {
        name: tableName,
        fields: updatedFields,
        contextDescription,
      });
    }
  }, [edges]);

  return (
    <div className="w-96 border-l bg-background overflow-y-auto h-full">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Table Properties</h2>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4 mb-6 px-4">
        <div>
          <Label htmlFor="table-name">Table Name</Label>
          <Input
            id="table-name"
            value={tableName}
            onChange={(e) => handleTableNameChange(e.target.value)}
            className="mt-1"
            placeholder="e.g., users, products"
            required
          />
        </div>

        {/* Context Description Section */}
        <div className="w-full border-t pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4" />
            <h3 className="text-sm font-medium">Context for AI Generation</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="context-description">
              Context Description{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="context-description"
              value={contextDescription}
              onChange={(e) => handleContextDescriptionChange(e.target.value)}
              className="mt-1 min-h-[100px]"
              placeholder="Describe the purpose of this table and any specific requirements for data generation..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Providing context helps the AI generate more relevant and accurate
              data. For example: "This is a users table for a social media app
              targeting young professionals."
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-4 px-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-medium">Fields</h3>

          {/* Show compound primary key information if present */}
          {hasCompoundPrimaryKey && (
            <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
              <HelpCircle className="h-4 w-4 mr-1" />
              <span>Compound key ({primaryKeyFields.length})</span>
            </div>
          )}
        </div>

        {fields.map((field, index) => {
          const keyInfo = getForeignKeyInfo(field.name);
          return (
            <div
              key={field.id}
              className={`rounded-lg border p-4 space-y-3 ${
                field.primaryKey
                  ? "border-primary border-2"
                  : keyInfo.isRelational
                  ? "border-blue-400 border-2"
                  : ""
              }`}
            >
              {/* Field badges section */}
              <div className="flex flex-wrap gap-2 items-center">
                {/* Primary key indicator */}
                {field.primaryKey && (
                  hasCompoundPrimaryKey ? (
                    <CompoundPrimaryKeyBadge keyCount={primaryKeyFields.length} />
                  ) : (
                    <PrimaryKeyBadge />
                  )
                )}

                {/* Foreign key indicator */}
                {keyInfo.isRelational && !field.primaryKey && (
                  keyInfo.isForeignKey ? (
                    <ForeignKeyBadge 
                      tooltipContent={
                        <>
                          {keyInfo.relationships.map((rel, i) => (
                            <p key={i} className="text-xs mb-1">
                              {`References ${rel.tableName}.${rel.fieldName} (${rel.relationshipType})`}
                            </p>
                          ))}
                        </>
                      }
                    />
                  ) : (
                    <ReferencedKeyBadge 
                      tooltipContent={
                        <>
                          {keyInfo.relationships.map((rel, i) => (
                            <p key={i} className="text-xs mb-1">
                              {`Referenced by ${rel.tableName}.${rel.fieldName} (${rel.relationshipType})`}
                            </p>
                          ))}
                        </>
                      }
                    />
                  )
                )}
                
                {/* Template badge */}
                {hasTemplate(field) && field.template && field.templateVariation && (
                  <TemplateBadge
                    template={field.template}
                    variation={field.templateVariation}
                    onRemove={() => handleRemoveTemplate(index)}
                  />
                )}
              </div>

              {/* Template selector - only shown for non-relational fields */}
              {!keyInfo.isRelational && (
                <div className="w-full">
                  <TemplateSelector
                    onSelectTemplate={(template, variation) =>
                      handleApplyTemplate(index, template, variation)
                    }
                    className="w-full"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <Input
                  value={field.name}
                  onChange={(e) => updateField(index, { name: e.target.value })}
                  placeholder="Field name"
                  className="flex-1"
                  disabled={keyInfo.isRelational}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeField(index)}
                  disabled={fields.length === 1 || keyInfo.isRelational}
                  className="h-9 w-9"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={(value: FieldType) =>
                      handleTypeChange(index, value)
                    }
                    disabled={keyInfo.isRelational || hasTemplate(field)}
                  >
                    <SelectTrigger className={`mt-1 ${hasTemplate(field) ? "opacity-60" : ""}`}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {databaseTypes[databaseType].map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Show length field only for types that need it */}
                {needsLength(field.type) && (
                  <div>
                    <Label className="text-xs">Length</Label>
                    <Input
                      type="number"
                      min={1}
                      value={field.length || getDefaultLength(field.type)}
                      onChange={(e) =>
                        updateField(index, { length: Number(e.target.value) })
                      }
                      className={`mt-1 ${hasTemplate(field) ? "opacity-60" : ""}`}
                      disabled={keyInfo.isRelational || hasTemplate(field)}
                      required
                    />
                  </div>
                )}
              </div>

              {/* Context hint for AI generation */}
              <div>
                <Label className="text-xs">Context Hint (Optional)</Label>
                <Input
                  value={field.contextHint || ""}
                  onChange={(e) =>
                    updateField(index, { contextHint: e.target.value })
                  }
                  placeholder="Additional context to guide AI data generation for this field"
                  className={`mt-1 ${hasTemplate(field) || keyInfo.isRelational ? "opacity-60" : ""}`}
                  disabled={hasTemplate(field) || keyInfo.isRelational}
                />
                {hasTemplate(field) && (
                  <p className="text-xs text-muted-foreground mt-1">
                    This field is using a template. The context hint is set by the template.
                  </p>
                )}
                {keyInfo.isRelational && !hasTemplate(field) && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Context hints are not applicable to relationship fields. Values must match the referenced table.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`primary-${index}`}
                    checked={field.primaryKey}
                    onCheckedChange={(checked) =>
                      updateField(index, { primaryKey: Boolean(checked) })
                    }
                    disabled={keyInfo.isRelational}
                  />
                  <Label
                    htmlFor={`primary-${index}`}
                    className={`text-xs flex items-center ${
                      keyInfo.isRelational ? "text-muted-foreground" : ""
                    }`}
                  >
                    Primary Key
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Primary keys uniquely identify each record in a
                            table.
                          </p>
                          <p className="mt-1">
                            Multiple primary key fields form a compound key.
                          </p>
                          {keyInfo.isRelational && (
                            <p className="mt-1 text-amber-500">
                              Cannot modify a field used in relationships.
                            </p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                </div>

                {/* Unique constraint checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`unique-${index}`}
                    checked={field.unique}
                    onCheckedChange={(checked) =>
                      updateField(index, { unique: Boolean(checked) })
                    }
                    disabled={field.primaryKey || keyInfo.isRelational}
                  />
                  <Label
                    htmlFor={`unique-${index}`}
                    className={`text-xs flex items-center ${
                      field.primaryKey || keyInfo.isRelational
                        ? "text-muted-foreground"
                        : ""
                    }`}
                  >
                    Unique
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Unique fields cannot contain duplicate values across
                            records.
                          </p>
                          <p className="mt-1">
                            Unique fields can be referenced by foreign keys.
                          </p>
                          {field.primaryKey && (
                            <p className="mt-1 text-amber-500">
                              Primary keys are already unique by definition.
                            </p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                </div>

                {/* Auto-increment option - only shown for supported field types */}
                {supportsAutoIncrement(field.type) && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`auto-increment-${index}`}
                      checked={field.autoIncrement}
                      onCheckedChange={(checked) =>
                        updateField(index, { autoIncrement: Boolean(checked) })
                      }
                      disabled={keyInfo.isRelational}
                    />
                    <Label
                      htmlFor={`auto-increment-${index}`}
                      className={`text-xs ${
                        keyInfo.isRelational ? "text-muted-foreground" : ""
                      }`}
                    >
                      Auto Increment
                    </Label>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor={`nullable-${index}`}
                    className={
                      field.primaryKey
                        ? "text-xs text-muted-foreground"
                        : keyInfo.isRelational
                        ? "text-xs text-muted-foreground"
                        : "text-xs"
                    }
                  >
                    Nullable
                    {field.primaryKey && (
                      <span className="ml-1 text-[10px] text-muted-foreground italic">
                        (PK must be not null)
                      </span>
                    )}
                    {keyInfo.isRelational && !field.primaryKey && (
                      <span className="ml-1 text-[10px] text-muted-foreground italic">
                        (Foreign key setting)
                      </span>
                    )}
                  </Label>
                  <Switch
                    id={`nullable-${index}`}
                    checked={field.nullable}
                    onCheckedChange={(checked) =>
                      updateField(index, { nullable: checked })
                    }
                    disabled={field.primaryKey || keyInfo.isRelational}
                    className={
                      field.primaryKey || keyInfo.isRelational
                        ? "opacity-50"
                        : ""
                    }
                  />
                </div>
              </div>

              {keyInfo.isRelational && (
                <div className="flex items-center gap-2 mt-2 text-amber-500 text-xs">
                  <AlertCircle className="h-8 w-8" />
                  <span>
                    This field is part of a relationship and cannot be modified.
                    Remove the relationship first to make changes.
                  </span>
                </div>
              )}
            </div>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={addField}
          className="w-full mt-2"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Field
        </Button>
      </div>

      <Separator className="my-4" />

      <div className="px-4 pb-4">
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => removeNode(node.id)}
        >
          Delete Table
        </Button>
      </div>
    </div>
  );
}
