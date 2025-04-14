import PocketBase from 'pocketbase';

// Initialize PocketBase client
const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';
const pb = new PocketBase(POCKETBASE_URL);

export default pb;