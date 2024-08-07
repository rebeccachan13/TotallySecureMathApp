import * as Keychain from 'react-native-keychain';

// Function to store API key securely
export const storeApiKey = async (apiKey) => {
  try {
    await Keychain.setGenericPassword('apiKey', apiKey);
    console.log("API key stored securely");
  } catch (error) {
    console.error("Error storing API key: ", error);
  }
};

// Function to retrieve API key securely
export const getApiKey = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log("Retrieved API key:", credentials.password);
      return credentials.password;
    } else {
      console.log("No API key stored");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving API key: ", error);
    return null;
  }
};
