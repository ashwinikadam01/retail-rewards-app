import React from 'react';
import SortableTable from './SortableTable';

const TotalRewardsTable = ({ transactions }) => {
  const totals = {};

  transactions.forEach(tx => {
    if (!totals[tx.name]) {
      totals[tx.name] = 0;
    }
    totals[tx.name] += tx.rewardPoints;
  });

  const totalArray = Object.entries(totals).map(([name, points]) => ({ name, points }));

  const columns = [
    { id: 'name', label: 'Customer Name' },
    { id: 'points', label: 'Reward Points' },
  ];

  return (
    <>
      <h3 className="m-tb-10">Total Rewards</h3>
      <SortableTable data={totalArray} columns={columns} />
    </>
  );
};

export default TotalRewardsTable;
