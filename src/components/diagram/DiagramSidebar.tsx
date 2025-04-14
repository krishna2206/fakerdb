import { Button } from '@/components/ui/button';
import { TableField } from '@/types/types';
import { Edge, Node } from '@xyflow/react';
import { Database, X } from 'lucide-react';
import TablePropertiesSidebar from './TablePropertiesSidebar';

interface TableNodeData {
  name: string;
  fields: TableField[];
  contextDescription?: string;
}

type DiagramSidebarProps = {
  node?: {
    id: string,
    data: TableNodeData
  };
  updateNodeData?: (nodeId: string, data: TableNodeData) => void;
  removeNode?: (nodeId: string) => void;
  onClose?: () => void;
  edges?: Edge[];
  nodes?: Node[];
};

export default function DiagramSidebar({ node, updateNodeData, removeNode, onClose, edges, nodes }: DiagramSidebarProps) {
  // If node is selected and we have required props, render the table properties sidebar
  if (node && updateNodeData && removeNode) {
    return (
      <TablePropertiesSidebar
        node={node}
        updateNodeData={updateNodeData}
        removeNode={removeNode}
        onClose={onClose}
        edges={edges}
        nodes={nodes}
      />
    );
  }

  // Return default content when no node is selected
  return (
    <div className="w-96 border-l bg-background overflow-y-auto h-full">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Properties Panel</h2>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="flex flex-col items-center justify-center p-8 text-center h-[calc(100%-64px)]">
        <div className="bg-muted/30 p-6 rounded-lg">
          <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No Table Selected</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Click on a table in the diagram to view and edit its properties.
          </p>
          <p className="text-xs text-muted-foreground">
            You can also create a new table using the "Add Table" button in the toolbar.
          </p>
        </div>
      </div>
    </div>
  );
}