/**
 * Calculates reward points based on the purchase amount.
 * @param {number} amount - The purchase amount.
 * @returns {number} The calculated reward points.
 */
export const calculatePoints = (amount) => {
  const roundedAmount = Math.floor(amount);
  if (isNaN(roundedAmount)) return 0;
  if (roundedAmount <= 50) return 0;
  if (roundedAmount <= 100) return roundedAmount - 50;
  return (roundedAmount - 100) * 2 + 50;
};
