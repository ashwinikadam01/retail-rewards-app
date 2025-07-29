import React from 'react';
import SortableTable from './SortableTable';
import { formatDate } from '../helpers/formatDate';

const MonthlyRewardsTable = ({ transactions }) => {
  const rewardsByMonthYear = {};

  transactions.forEach(tx => {
    const dateObj = new Date(tx.date);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const key = `${month} ${year}`;
    const customerKey = `${tx.customerId}-${key}`;

    if (!rewardsByMonthYear[key]) {
      rewardsByMonthYear[key] = {};
    }

    if (!rewardsByMonthYear[key][customerKey]) {
      rewardsByMonthYear[key][customerKey] = {
        customerId: tx.customerId,
        name: tx.name,
        id: tx.id,
        date: formatDate(tx.date),
        year,
        amount: 0,
        points: 0,
      };
    }

    rewardsByMonthYear[key][customerKey].points += tx.rewardPoints;
    rewardsByMonthYear[key][customerKey].amount += tx.amount;
  });

  const columns = [
    { id: 'customerId', label: 'Customer ID' },
    { id: 'name', label: 'Name' },
    { id: 'id', label: 'Transaction ID' },
    { id: 'date', label: 'Date' },
    { id: 'year', label: 'Year' },
    { id: 'amount', label: 'Amount ($)' },
    { id: 'points', label: 'Reward Points' },
  ];

  const sortedKeys = Object.keys(rewardsByMonthYear).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });

  return (
    <>
      {sortedKeys.map((key, index) => {
        const customerData = rewardsByMonthYear[key];
        const tableData = Object.values(customerData).map(item => ({
          ...item,
          amount: item.amount.toFixed(2),
        }));
        return (
          <SortableTable
            key={key}
            data={tableData}
            columns={columns}
            tableSubHeader={key}
            mainHeader={index === 0 ? 'User Monthly Rewards' : null}
          />
        );
      })}
    </>
  );
};

export default MonthlyRewardsTable;
