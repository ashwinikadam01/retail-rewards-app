import React from 'react';
import SortableTable from './SortableTable';

const MonthlyRewardsTable = ({ transactions }) => {
  const rewards = {};

  transactions.forEach(tx => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
    const year = new Date(tx.date).getFullYear();
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

  const columns = [
    { id: 'customerId', label: 'Customer ID' },
    { id: 'name', label: 'Name' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
    { id: 'points', label: 'Reward Points' },
  ];

  return (
    <>
      <h3 className="m-tb-10">User Monthly Rewards</h3>
      <SortableTable data={rewardArray} columns={columns} />
    </>
  );
};

export default MonthlyRewardsTable;
