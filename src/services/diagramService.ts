import pb from '@/lib/pocketbaseClient';
import { Edge, Node } from '@xyflow/react';
import { updateProject } from './projectService';

interface DiagramData {
  nodes: Node[];
  edges: Edge[];
}

/**
 * Saves or updates a project's diagram data in the database.
 * @param projectId - The ID of the project to save the diagram for.
 * @param nodes - Array of diagram nodes representing tables.
 * @param edges - Array of diagram edges representing relationships between tables.
 * @param previewImage - Optional base64 encoded preview image of the diagram.
 * @returns A promise that resolves when the operation is complete.
 */
export const saveProjectDiagram = async (
  projectId: string, 
  nodes: Node[], 
  edges: Edge[],
  previewImage?: string
): Promise<void> => {
  try {
    // Check if diagram exists for this project
    const existingDiagrams = await pb.collection('diagrams').getList(1, 1, {
      filter: `projectId = "${projectId}"`,
    });
    
    const diagramData = {
      projectId,
      nodes,
      edges,
    };
    
    if (existingDiagrams.totalItems > 0) {
      await pb.collection('diagrams').update(existingDiagrams.items[0].id, diagramData);
    } else {
      await pb.collection('diagrams').create(diagramData);
    }
    
    // Update the project with previewImage and tableCount
    await updateProject(projectId, {
      previewImage: previewImage || '/placeholder-diagram.svg',
      tableCount: nodes.length,
    });
    
  } catch (error) {
    console.error(`Error saving diagram for project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Fetches a project's diagram data from the database.
 * @param projectId - The ID of the project to fetch the diagram for.
 * @returns A promise resolving to the diagram data or null if no diagram exists.
 */
export const getProjectDiagram = async (projectId: string): Promise<DiagramData | null> => {
  try {
    const diagrams = await pb.collection('diagrams').getList(1, 1, {
      filter: `projectId = "${projectId}"`,
    });
    
    if (diagrams.totalItems === 0) {
      return null;
    }
    
    const diagram = diagrams.items[0];
    return {
      nodes: diagram.nodes,
      edges: diagram.edges,
    };
  } catch (error) {
    console.error(`Error fetching diagram for project ${projectId}:`, error);
    throw error;
  }
};