export const validateInput = (input) => {
  // Allow only alphanumeric characters and spaces
  return input.replace(/[^a-zA-Z0-9 ]/g, '');
};
