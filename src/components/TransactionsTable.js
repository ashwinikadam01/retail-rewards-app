import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const TransactionsTable = ({ transactions }) => (
  <Paper className='m-tb-20'>
		<h3 className='m-tb-10'>Transactions</h3>
		<Table className='table'>
			<TableHead>
				<TableRow className='table-header'>
          <TableCell>ID</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>Amount ($)</TableCell>
          <TableCell>Reward Points</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map(tx => (
          <TableRow key={tx.id} className='hover-row'>
            <TableCell>{tx.id}</TableCell>
            <TableCell>{tx.name}</TableCell>
            <TableCell>{formatDate(tx.date)}</TableCell>
            <TableCell>{tx.product}</TableCell>
            <TableCell>{tx.amount}</TableCell>
            <TableCell>{tx.rewardPoints}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default TransactionsTable;
