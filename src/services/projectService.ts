import pb from '@/lib/pocketbaseClient';
import { Project } from '@/types/types';

// Project Collection Functions
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
      geminiApiKey: record.geminiApiKey || null,
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

export const getProject = async (projectId: string): Promise<Project> => {
  try {
    const record = await pb.collection('projects').getOne(projectId);
    return {
      id: record.id,
      name: record.name,
      description: record.description,
      userId: record.userId,
      databaseType: record.databaseType,
      geminiApiKey: record.geminiApiKey || null,
      createdAt: record.created,
      updatedAt: record.updated,
    };
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    throw error;
  }
};

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
      geminiApiKey: projectData.geminiApiKey || null,
    };
    
    const record = await pb.collection('projects').create(data);
    
    return {
      id: record.id,
      name: record.name,
      description: record.description,
      userId: record.userId,
      databaseType: record.databaseType,
      geminiApiKey: record.geminiApiKey || null,
      createdAt: record.created,
      updatedAt: record.updated,
    };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (projectId: string, projectData: Partial<Project>): Promise<Project> => {
  try {
    const record = await pb.collection('projects').update(projectId, projectData);
    
    return {
      id: record.id,
      name: record.name,
      description: record.description,
      userId: record.userId,
      databaseType: record.databaseType,
      geminiApiKey: record.geminiApiKey || null,
      createdAt: record.created,
      updatedAt: record.updated,
    };
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    throw error;
  }
};

export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    await pb.collection('projects').delete(projectId);
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    throw error;
  }
};
