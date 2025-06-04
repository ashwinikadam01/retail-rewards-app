import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const MonthlyRewardsTable = ({ transactions }) => {
  const rewards = {};

  transactions.forEach(tx => {
    const date = new Date(tx.date);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const key = `${tx.customerId}-${month}-${year}`;

    if (!rewards[key]) {
      rewards[key] = {
        customerId: tx.customerId,
        name: tx.name,
        month,
        year,
        points: 0,
      };
    }

    rewards[key].points += tx.rewardPoints;
  });

  const rewardArray = Object.values(rewards);

  return (
    <Paper className='m-tb-20'>
      <h3 className='m-tb-10'>User Monthly Rewards</h3>
      <Table className='table'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Customer ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Reward Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rewardArray.map((r, idx) => (
            <TableRow key={idx} className='hover-row'>
              <TableCell>{r.customerId}</TableCell>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.month}</TableCell>
              <TableCell>{r.year}</TableCell>
              <TableCell>{r.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default MonthlyRewardsTable;
