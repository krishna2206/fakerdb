import {
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from '@xyflow/react';
import { memo } from 'react';

function RelationshipEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const relationshipSymbol = () => {
    switch (data?.relationship) {
      case 'one-to-one':
        return '1:1';
      case 'one-to-many':
        return '1:N';
      case 'many-to-many':
        return 'N:M';
      default:
        return '1:N';
    }
  };

  return (
    <>
      <path 
        id={id} 
        className="react-flow__edge-path stroke-primary" 
        strokeWidth={2}
        d={edgePath} 
        markerEnd={markerEnd} 
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="bg-background text-xs px-2 py-1 rounded-full shadow-md border border-border"
        >
          {relationshipSymbol()}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default memo(RelationshipEdge);