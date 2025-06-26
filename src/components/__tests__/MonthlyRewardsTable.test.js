import React from 'react';
import { render, screen } from '@testing-library/react';
import MonthlyRewardsTable from '../MonthlyRewardsTable';

const mockTransactions = [
	{
		id: 1,
		customerId: 101,
		name: 'Emma Johnson',
		date: '2025-04-15',
		product: 'Shoes',
		amount: 120,
		rewardPoints: 90,
	},
	{
		id: 2,
		customerId: 101,
		name: 'Emma Johnson',
		date: '2025-04-20',
		product: 'Hat',
		amount: 60,
		rewardPoints: 10,
	}
];

describe('MonthlyRewardsTable', () => {
	test('renders monthly reward points correctly', () => {
		render(<MonthlyRewardsTable transactions={mockTransactions} />);
		expect(screen.getByText(/User Monthly Rewards/i)).toBeInTheDocument();
		expect(screen.getByText(/Emma Johnson/i)).toBeInTheDocument();
		expect(screen.getByText('Apr')).toBeInTheDocument();
		expect(screen.getByText('100')).toBeInTheDocument(); // Total points
	});
});
