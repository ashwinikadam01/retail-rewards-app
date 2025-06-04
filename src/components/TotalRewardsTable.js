import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const TotalRewardsTable = ({ transactions }) => {
  const totals = {};

  transactions.forEach(tx => {
    if (!totals[tx.name]) {
      totals[tx.name] = 0;
    }
    totals[tx.name] += tx.rewardPoints;
  });

  const totalArray = Object.entries(totals).map(([name, points]) => ({ name, points }));

  return (
    <Paper className='m-tb-20'>
			<h3 className='m-tb-10'>Total Rewards</h3>
			<Table className='table'>
				<TableHead>
					<TableRow className='table-header'>
						<TableCell>Customer Name</TableCell>
						<TableCell>Reward Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {totalArray.map((row, idx) => (
            <TableRow key={idx} className='hover-row'>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TotalRewardsTable;
