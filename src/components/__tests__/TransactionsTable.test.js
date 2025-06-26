import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionsTable from '../TransactionsTable';

const mockTransactions = [
	{
		id: 1,
		name: 'Alice Smith',
		date: '2025-04-01',
		product: 'Shoes',
		amount: 120,
		rewardPoints: 90
	}
];

describe('TransactionsTable', () => {
	test('renders transaction data correctly', () => {
		render(<TransactionsTable transactions={mockTransactions} />);
		expect(screen.getByText(/Transactions/i)).toBeInTheDocument();
		expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
		expect(screen.getByText(/Shoes/i)).toBeInTheDocument();
		expect(screen.getByText('120.00')).toBeInTheDocument();
		expect(screen.getByText('90')).toBeInTheDocument();
	});
});
