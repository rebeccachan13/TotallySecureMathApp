import { storeApiKey, getApiKey } from '../utils/secureStorage';

// Store the API key securely (consider inputting this securely only once)
storeApiKey('your_actual_api_key_here'); // Replace with your actual API key

// Function to use the API key securely
const useApiKey = async () => {
  const apiKey = await getApiKey();
  if (apiKey) {
    // Use the API key for network requests
    console.log("Using API key:", apiKey);
  }
};

useApiKey();
