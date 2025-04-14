import { Button } from "@/components/ui/button";
import { Edge, Node } from "@xyflow/react";
import { X } from "lucide-react";
import React from "react";

// Relationship types mapping
const RELATIONSHIP_TYPES = {
  "one-to-one": "One-to-One (1:1)",
  "one-to-many": "One-to-Many (1:N)",
  "many-to-many": "Many-to-Many (N:M)",
};

interface NodeData {
  name: string;
  [key: string]: string | number | boolean | object | undefined;
}

interface RelationshipSidebarProps {
  edge: Edge;
  nodes: Node<NodeData>[];
  removeEdge: (edgeId: string) => void;
  onClose: () => void;
}

const RelationshipSidebar: React.FC<RelationshipSidebarProps> = ({
  edge,
  nodes,
  removeEdge,
  onClose,
}) => {
  // Get relationship type label
  const relationshipType = edge?.data?.relationship || "one-to-many";
  const relationshipLabel =
    RELATIONSHIP_TYPES[relationshipType as keyof typeof RELATIONSHIP_TYPES] ||
    "One-to-Many (1:N)";

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Relationship</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="w-full flex items-center gap-2">
          Relationship Type :
          <span className="font-bold">{relationshipLabel}</span>
        </div>

        <div className="p-4 bg-muted/30 rounded">
          <div className="text-sm">
            <strong className="block mb-1">From:</strong>
            <span>
              {nodes.find((n) => n.id === edge.source)?.data.name || "Unknown"}.
              {edge.sourceHandle.split("-")[0]}
            </span>
          </div>
          <div className="text-sm mt-3">
            <strong className="block mb-1">To:</strong>
            <span>
              {nodes.find((n) => n.id === edge.target)?.data.name || "Unknown"}.
              {edge.targetHandle.split("-")[0]}
            </span>
          </div>
        </div>

        <Button
          variant="destructive"
          className="w-full mt-4"
          onClick={() => removeEdge(edge.id)}
        >
          Remove Relationship
        </Button>
      </div>
    </div>
  );
};

export default RelationshipSidebar;
