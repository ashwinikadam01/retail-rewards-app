import React from 'react';
import SortableTable from './SortableTable';
import { formatDate } from '../helpers/formatDate';

const TransactionsTable = ({ transactions }) => {
  const formattedData = transactions.map(tx => ({
    id: tx.id,
    name: tx.name,
    date: formatDate(tx.date),
    product: tx.product,
    amount: tx.amount.toFixed(2),
    rewardPoints: tx.rewardPoints,
  }));

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Customer' },
    { id: 'date', label: 'Date' },
    { id: 'product', label: 'Product' },
    { id: 'amount', label: 'Amount ($)' },
    { id: 'rewardPoints', label: 'Reward Points' },
  ];

  const tableHeader = "All Transactions";

  return (
    <>
      <SortableTable data={formattedData} columns={columns} tableHeader={tableHeader} />
    </>
  );
};

export default TransactionsTable;
