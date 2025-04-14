import pb from '@/lib/pocketbaseClient';
import { Edge, Node } from '@xyflow/react';

interface DiagramData {
  nodes: Node[];
  edges: Edge[];
  previewImage?: string;
}

export const saveProjectDiagram = async (
  projectId: string, 
  nodes: Node[], 
  edges: Edge[],
  previewImage?: string // Optional preview image as base64 data URL
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
      ...(previewImage && { previewImage }), // Add preview image if provided
    };
    
    if (existingDiagrams.totalItems > 0) {
      // Update existing diagram
      await pb.collection('diagrams').update(existingDiagrams.items[0].id, diagramData);
    } else {
      // Create new diagram
      await pb.collection('diagrams').create(diagramData);
    }
    
    // Update the project's 'updated' field to reflect this change
    // PocketBase automatically updates the 'updated' field when using update(),
    // but we need to trigger it by calling update on the project
    await pb.collection('projects').update(projectId, {});
    
  } catch (error) {
    console.error(`Error saving diagram for project ${projectId}:`, error);
    throw error;
  }
};

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
      previewImage: diagram.previewImage,
    };
  } catch (error) {
    console.error(`Error fetching diagram for project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Fetches the count of nodes (tables) for multiple project diagrams.
 * @param projectIds - An array of project IDs.
 * @returns A promise resolving to a map of projectId -> node count.
 */
export const getProjectDiagramCounts = async (projectIds: string[]): Promise<Record<string, number>> => {
  if (projectIds.length === 0) {
    return {};
  }

  try {
    // Create a filter string like: projectId='id1' || projectId='id2' || ...
    const filter = projectIds.map(id => `projectId = "${id}"`).join(' || ');
    
    // Fetch all relevant diagrams, only getting necessary fields
    const diagrams = await pb.collection('diagrams').getFullList({
      filter: filter,
      fields: 'projectId, nodes', // Only fetch projectId and nodes array
    });

    const counts: Record<string, number> = {};
    diagrams.forEach(diagram => {
      // Ensure nodes is an array before counting
      const nodeCount = Array.isArray(diagram.nodes) ? diagram.nodes.length : 0;
      counts[diagram.projectId] = nodeCount;
    });

    // Ensure all requested projectIds have an entry, defaulting to 0 if no diagram found
    projectIds.forEach(id => {
      if (!(id in counts)) {
        counts[id] = 0;
      }
    });

    return counts;
  } catch (error) {
    console.error('Error fetching project diagram counts:', error);
    // Return an empty map or rethrow, depending on desired error handling
    // Returning empty map for now to avoid breaking the UI completely
    return {}; 
  }
};

/**
 * Fetches preview images for multiple projects
 * @param projectIds - An array of project IDs
 * @returns A promise resolving to a map of projectId -> preview image
 */
export const getProjectPreviewImages = async (projectIds: string[]): Promise<Record<string, string>> => {
  if (projectIds.length === 0) {
    return {};
  }

  try {
    // Create a filter string like: projectId='id1' || projectId='id2' || ...
    const filter = projectIds.map(id => `projectId = "${id}"`).join(' || ');
    
    // Fetch all relevant diagrams, only getting necessary fields
    const diagrams = await pb.collection('diagrams').getFullList({
      filter: filter,
      fields: 'projectId,previewImage', // Only fetch projectId and previewImage
    });

    const previewImages: Record<string, string> = {};
    
    // Default placeholder for projects without preview images
    const defaultPreviewImage = '/placeholder-diagram.svg';
    
    diagrams.forEach(diagram => {
      previewImages[diagram.projectId] = diagram.previewImage || defaultPreviewImage;
    });

    // Ensure all requested projectIds have an entry
    projectIds.forEach(id => {
      if (!(id in previewImages)) {
        previewImages[id] = defaultPreviewImage;
      }
    });

    return previewImages;
  } catch (error) {
    console.error('Error fetching project preview images:', error);
    return {}; 
  }
};