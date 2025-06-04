import transactions from '../data/transactions';

export const fetchTransactions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000);
  });
};