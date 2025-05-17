import { cn } from "@/lib/utils";
import { TableField } from "@/types/types";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
import { Table2 } from "lucide-react";
import { memo, useEffect } from "react";

type TableNodeProps = {
  id: string;
  data: {
    name: string;
    fields: TableField[];
    contextDescription?: string;
  };
  selected: boolean;
};

function TableNode({ id, data, selected }: TableNodeProps) {
  const updateNodeInternals = useUpdateNodeInternals();

  // Update node internals when fields change
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, data.fields, updateNodeInternals]);

  return (
    <div
      className="min-w-[220px] bg-card rounded-lg shadow-md transition-all duration-200"
    >
      <div className="bg-primary text-primary-foreground dark:bg-accent dark:text-accent-foreground p-3 flex justify-between items-center rounded-t-lg">
        <span
          className="font-semibold truncate max-w-[160px]"
          title={data.name}
        >
          {data.name}
        </span>
        <Table2 className="h-4 w-4 flex-shrink-0" />
      </div>
      <div className="py-1">
        {data.fields.map((field, index) => (
          <div
            key={`${id}-${field.name}`}
            className={cn(
              "flex justify-between items-center py-2 px-3 hover:bg-accent/10 text-sm relative group",
              index !== data.fields.length - 1 && "border-b border-border/50"
            )}
          >
            {/* Left handle based on field type */}
            {field.primaryKey ? (
              <Handle
                type="source"
                position={Position.Left}
                id={`${field.name}-left`}
                className="right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-green-500 cursor-crosshair opacity-0 group-hover:opacity-100 transition-opacity"
                isConnectable={true}
              />
            ) : (
              <Handle
                type="target"
                position={Position.Left}
                id={`${field.name}-left`}
                className="right-0 bg-background w-3 h-3 rounded-full border-2 border-blue-500 cursor-crosshair opacity-0 group-hover:opacity-100 transition-opacity"
                isConnectable={true}
              />
            )}

            <div className="flex items-center gap-2">
              {field.primaryKey && (
                <span
                  className="text-amber-500 dark:text-amber-400"
                  title="Primary Key"
                >
                  🔑
                </span>
              )}
              <span
                className="truncate max-w-[100px] font-medium"
                title={field.name}
              >
                {field.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <small
                className="text-muted-foreground text-xs bg-muted/30 px-1.5 py-0.5 rounded-full truncate max-w-[100px]"
                title={field.type}
              >
                {field.type}
              </small>
              {!field.nullable && (
                <small
                  title="Not Nullable"
                  className="font-bold text-destructive"
                >
                  *
                </small>
              )}
            </div>

            {/* Right handle based on field type */}
            {field.primaryKey ? (
              <Handle
                type="source"
                position={Position.Right}
                id={`${field.name}-right`}
                className="right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-green-500 cursor-crosshair opacity-0 group-hover:opacity-100 transition-opacity"
                isConnectable={true}
              />
            ) : (
              <Handle
                type="target"
                position={Position.Right}
                id={`${field.name}-right`}
                className="right-0 bg-background w-3 h-3 rounded-full border-2 border-blue-500 cursor-crosshair opacity-0 group-hover:opacity-100 transition-opacity"
                isConnectable={true}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(TableNode);
