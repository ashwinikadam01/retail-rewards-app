import transactions from '../data/Transactions';

export const fetchTransactions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000);
  });
};