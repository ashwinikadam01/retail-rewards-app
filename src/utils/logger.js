export const logError = (error, info = '') => {
  console.error(`[ERROR] ${new Date().toISOString()}:`, error, info);
};
