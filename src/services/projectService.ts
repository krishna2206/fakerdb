import pb from '@/lib/pocketbaseClient';
import { Project } from '@/types/types';
import { decryptSensitiveData, encryptSensitiveData } from '@/utils/encryptionUtils';

/**
 * Fetches projects for the currently authenticated user with optional pagination and search.
 * @param page - The page number to fetch (starting from 1).
 * @param perPage - Number of projects per page.
 * @param searchTerm - Optional search term to filter projects by name or description.
 * @returns Promise resolving to object containing paginated projects, total count, and page info.
 */
export const fetchProjects = async (
  page: number = 1, 
  perPage: number = 12, 
  searchTerm: string = ""
): Promise<{ items: Project[], totalItems: number, totalPages: number }> => {
  try {
    const user = pb.authStore.record;
    if (!user) {
        throw new Error('User not authenticated');
    }
    const userId = user.id;
    
    // Set up filter based on user ID and optional search term
    let filter = `userId = "${userId}"`;
    if (searchTerm) {
      filter += ` && (name ~ "${searchTerm}" || description ~ "${searchTerm}")`;
    }
    
    // Get projects with pagination
    const records = await pb.collection('projects').getList(page, perPage, {
      filter: filter,
      sort: '-updated',
    });
    
    const projects = records.items.map(record => ({
      id: record.id,
      name: record.name,
      description: record.description,
      userId: record.userId,
      databaseType: record.databaseType,
      geminiApiKey: record.geminiApiKey ? decryptSensitiveData(record.geminiApiKey, userId) : null,
      previewImage: record.previewImage || '/placeholder-diagram.svg',
      tableCount: record.tableCount || 0,
      createdAt: record.created,
      updatedAt: record.updated,
    }));

    return {
      items: projects,
      totalItems: records.totalItems,
      totalPages: records.totalPages
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * Retrieves a specific project by its ID.
 * @param projectId - The ID of the project to fetch.
 * @returns Promise resolving to the project data.
 * @throws Error if project not found or user lacks access.
 */
export const getProject = async (projectId: string): Promise<Project> => {
  try {
    const user = pb.authStore.record;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const userId = user.id;

    const record = await pb.collection('projects').getOne(projectId);

    return {
      id: record.id,
      name: record.name,
      description: record.description,
      userId: record.userId,
      databaseType: record.databaseType,
      geminiApiKey: record.geminiApiKey ? decryptSensitiveData(record.geminiApiKey, userId) : null,
      previewImage: record.previewImage || '/placeholder-diagram.svg',
      tableCount: record.tableCount || 0,
      createdAt: record.created,
      updatedAt: record.updated,
    };
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Creates a new project for the currently authenticated user.
 * @param projectData - The data for the new project (without id, createdAt, updatedAt).
 * @returns Promise resolving to the newly created project with server-assigned fields.
 * @throws Error if user not authenticated or data validation fails.
 */
export const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
  try {
    const user = pb.authStore.record;
    if (!user) {
        throw new Error('User not authenticated');
    }
    const userId = user.id;
    
    const data = {
      name: projectData.name,
      description: projectData.description,
      userId: userId,
      databaseType: projectData.databaseType,
      geminiApiKey: projectData.geminiApiKey ? encryptSensitiveData(projectData.geminiApiKey, userId) : null,
      previewImage: projectData.previewImage || '/placeholder-diagram.svg',
      tableCount: projectData.tableCount || 0,
    };
    
    const record = await pb.collection('projects').create(data);
    
    return {
      id: record.id,
      name: record.name,
      description: record.description,
      userId: record.userId,
      databaseType: record.databaseType,
      geminiApiKey: projectData.geminiApiKey,
      previewImage: record.previewImage || '/placeholder-diagram.svg',
      tableCount: record.tableCount || 0,
      createdAt: record.created,
      updatedAt: record.updated,
    };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

/**
 * Updates an existing project with the provided data.
 * @param projectId - The ID of the project to update.
 * @param projectData - Partial project data containing fields to update.
 * @returns Promise resolving to the updated project.
 * @throws Error if project not found or user lacks access.
 */
export const updateProject = async (projectId: string, projectData: Partial<Project>): Promise<Project> => {
  try {
    const user = pb.authStore.record;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const userId = user.id;
    
    // Create a copy to avoid modifying the original projectData
    const dataToUpdate = { ...projectData };
    
    if (dataToUpdate.geminiApiKey !== undefined) {
      dataToUpdate.geminiApiKey = dataToUpdate.geminiApiKey 
        ? encryptSensitiveData(dataToUpdate.geminiApiKey, userId) 
        : null;
    }
    
    const record = await pb.collection('projects').update(projectId, dataToUpdate);
    
    return {
      id: record.id,
      name: record.name,
      description: record.description,
      userId: record.userId,
      databaseType: record.databaseType,
      geminiApiKey: record.geminiApiKey ? decryptSensitiveData(record.geminiApiKey, userId) : null,
      previewImage: record.previewImage || '/placeholder-diagram.svg',
      tableCount: record.tableCount || 0,
      createdAt: record.created,
      updatedAt: record.updated,
    };
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Deletes a project by its ID.
 * @param projectId - The ID of the project to delete.
 * @returns Promise that resolves when the project is successfully deleted.
 * @throws Error if project not found or user lacks access.
 */
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    await pb.collection('projects').delete(projectId);
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    throw error;
  }
};
