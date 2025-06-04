export const calculatePoints = (amount) => {
  const roundedAmount = Math.floor(amount);
  if (roundedAmount <= 50) return 0;
  if (roundedAmount <= 100) return roundedAmount - 50;
  return (roundedAmount - 100) * 2 + 50;
};
