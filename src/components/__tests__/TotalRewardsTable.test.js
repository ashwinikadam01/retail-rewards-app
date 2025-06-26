import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalRewardsTable from '../TotalRewardsTable';

const mockTransactions = [
	{ id: 1, name: 'John Doe', amount: 120, rewardPoints: 90 },
	{ id: 2, name: 'John Doe', amount: 80, rewardPoints: 30 }
];

describe('TotalRewardsTable', () => {
	test('renders total reward points per customer', () => {
		render(<TotalRewardsTable transactions={mockTransactions} />);
		expect(screen.getByText(/Total Rewards/i)).toBeInTheDocument();
		expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
		expect(screen.getByText('120')).toBeInTheDocument(); // 90 + 30
	});
});
