// src/utils/inputValidation.js

// Simple validation function to sanitize input by removing special characters
export const validateInput = (input) => {
  // Allow only alphanumeric characters and spaces
  return input.replace(/[^a-zA-Z0-9 ]/g, '');
};
