import pb from '@/lib/pocketbaseClient';
import { Dataset, GeneratedData } from '@/types/types';

/**
 * Saves generated SQL data as a dataset
 * @param diagramId - The ID of the diagram this dataset belongs to
 * @param data - The generated SQL data
 * @param tableCount - Number of tables in the dataset
 * @param rowCount - Number of rows per table
 * @returns The created dataset record
 */
export const saveDataset = async (
  diagramId: string,
  data: GeneratedData,
  tableCount: number,
  rowCount: number
): Promise<Dataset> => {
  try {
    const datasetData = {
      diagramId,
      createTableSQL: data.createTableSQL,
      insertDataSQL: data.insertDataSQL,
      tableCount,
      rowCount
    };
    
    const record = await pb.collection('datasets').create(datasetData);
    
    return {
      id: record.id,
      diagramId: record.diagramId,
      createTableSQL: record.createTableSQL,
      insertDataSQL: record.insertDataSQL,
      tableCount: record.tableCount,
      rowCount: record.rowCount,
      created: record.created,
      updated: record.updated
    };
  } catch (error) {
    console.error('Error saving dataset:', error);
    throw error;
  }
};

/**
 * Fetches all datasets for a specific diagram
 * @param diagramId - The ID of the diagram to fetch datasets for
 * @returns Array of datasets
 */
export const getDiagramDatasets = async (diagramId: string): Promise<Dataset[]> => {
  try {
    const records = await pb.collection('datasets').getList(1, 50, {
      filter: `diagramId = "${diagramId}"`,
      sort: '-updated'
    });
    
    return records.items.map(record => ({
      id: record.id,
      diagramId: record.diagramId,
      createTableSQL: record.createTableSQL, 
      insertDataSQL: record.insertDataSQL,
      tableCount: record.tableCount,
      rowCount: record.rowCount,
      created: record.created,
      updated: record.updated
    }));
  } catch (error) {
    console.error(`Error fetching datasets for diagram ${diagramId}:`, error);
    throw error;
  }
};

/**
 * Fetches all datasets for a specific project
 * @param projectId - The ID of the project to fetch datasets for
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Array of datasets
 */
export const getProjectDatasets = async (
  projectId: string, 
): Promise<Dataset[]> => {
  try {
    const records = await pb.collection('datasets').getList(1, 50, {
      filter: `diagramId.projectId = "${projectId}"`,
      sort: '-updated',
      expand: 'diagramId',
    });
    
    return records.items.map(record => ({
      id: record.id,
      diagramId: record.diagramId,
      projectId: record.expand?.diagramId?.projectId,
      createTableSQL: record.createTableSQL,
      insertDataSQL: record.insertDataSQL,
      tableCount: record.tableCount,
      rowCount: record.rowCount,
      created: record.created, 
      updated: record.updated
    }));
  } catch (error) {
    console.error(`Error fetching datasets for project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Gets a specific dataset by ID
 * @param datasetId - The ID of the dataset to fetch
 * @returns The dataset if found
 */
export const getDataset = async (datasetId: string): Promise<Dataset> => {
  try {
    const record = await pb.collection('datasets').getOne(datasetId, {
      expand: 'diagramId'
    });
    
    return {
      id: record.id,
      diagramId: record.diagramId,
      projectId: record.expand?.diagramId?.projectId,
      createTableSQL: record.createTableSQL,
      insertDataSQL: record.insertDataSQL,
      tableCount: record.tableCount,
      rowCount: record.rowCount,
      created: record.created,
      updated: record.updated
    };
  } catch (error) {
    console.error(`Error fetching dataset ${datasetId}:`, error);
    throw error;
  }
};

/**
 * Deletes a dataset
 * @param datasetId - The ID of the dataset to delete
 */
export const deleteDataset = async (datasetId: string): Promise<void> => {
  try {
    await pb.collection('datasets').delete(datasetId);
  } catch (error) {
    console.error(`Error deleting dataset ${datasetId}:`, error);
    throw error;
  }
};

/**
 * Updates an existing dataset
 * @param datasetId - The ID of the dataset to update
 * @param data - The updated dataset data (partial or complete)
 * @returns The updated dataset record
 */
export const updateDataset = async (
  datasetId: string,
  data: Partial<Omit<Dataset, 'id' | 'created' | 'updated'>>
): Promise<Dataset> => {
  try {
    const record = await pb.collection('datasets').update(datasetId, data);
    
    return {
      id: record.id,
      diagramId: record.diagramId,
      projectId: record.projectId,
      createTableSQL: record.createTableSQL,
      insertDataSQL: record.insertDataSQL,
      tableCount: record.tableCount,
      rowCount: record.rowCount,
      created: record.created,
      updated: record.updated
    };
  } catch (error) {
    console.error(`Error updating dataset ${datasetId}:`, error);
    throw error;
  }
};