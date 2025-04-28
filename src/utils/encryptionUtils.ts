/**
 * Utilities for client-side encryption of sensitive data like API keys
 */
import CryptoJS from 'crypto-js';

const ENCRYPTION_SALT = import.meta.env.VITE_ENCRYPTION_SALT || 'fallback-salt-for-development';

/**
 * Encrypts sensitive data using AES encryption with a derived key
 * 
 * @param data - The sensitive data to encrypt (like API key)
 * @param userId - User ID to use as part of the encryption key
 * @returns Encrypted string safe for storage or null if input is empty
 */
export const encryptSensitiveData = (data: string | null, userId: string): string | null => {
  if (!data) return null;
  
  // Create a derived encryption key using user ID and browser fingerprint
  const browserFingerprint = getBrowserFingerprint();
  const encryptionKey = deriveEncryptionKey(userId, browserFingerprint);
  
  return CryptoJS.AES.encrypt(data, encryptionKey).toString();
};

/**
 * Decrypts sensitive data that was encrypted with encryptSensitiveData
 * 
 * @param encryptedData - The encrypted string
 * @param userId - User ID used in the encryption
 * @returns The original decrypted data or null if input is empty
 */
export const decryptSensitiveData = (encryptedData: string | null, userId: string): string | null => {
  if (!encryptedData) return null;
  
  try {
    // Recreate the same derived key
    const browserFingerprint = getBrowserFingerprint();
    const encryptionKey = deriveEncryptionKey(userId, browserFingerprint);
    
    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};

/**
 * Derives an encryption key from user ID and browser fingerprint
 * 
 * @param userId - The user's ID 
 * @param fingerprint - Browser fingerprint
 * @returns Derived encryption key
 */
const deriveEncryptionKey = (userId: string, fingerprint: string): string => {
  return CryptoJS.PBKDF2(
    `${userId}-${fingerprint}`, 
    ENCRYPTION_SALT,
    { keySize: 256/32, iterations: 1000 }
  ).toString();
};

/**
 * Generates a fingerprint based on browser information
 * This makes the encryption tied to the user's specific device
 */
const getBrowserFingerprint = (): string => {
  if (typeof window === 'undefined') return 'server-side';
  
  const userAgent = navigator.userAgent;
  const screenPrint = `${window.screen.height}${window.screen.width}${window.screen.colorDepth}`;
  const timezoneOffset = new Date().getTimezoneOffset();
  const language = navigator.language;
  
  return CryptoJS.SHA256(`${userAgent}${screenPrint}${timezoneOffset}${language}`).toString();
};