import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { fetchTransactions } from '../api/fetchTransactions';
import { calculatePoints } from '../utils/rewardUtils';
import TransactionsTable from '../components/TransactionsTable';
import MonthlyRewardsTable from '../components/MonthlyRewardsTable';
import TotalRewardsTable from '../components/TotalRewardsTable';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const Dashboard = () => {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchTransactions()
			.then((data) => {
				const enrichedData = data.map((tx) => ({
					...tx,
					rewardPoints: calculatePoints(tx.amount),
				}));
				setTransactions(enrichedData);
				setLoading(false);
			})
			.catch((err) => {
				console.error('Error fetching data:', err);
				setError('Failed to load transactions.');
				setLoading(false);
			});
	}, []);

	return (
		<Container maxWidth={false} className="m-0 p-15">
			<Typography variant="h4" gutterBottom>
				Customer Rewards Dashboard
			</Typography>

			{loading && <Loader />}
			{error && <ErrorAlert message={error} />}

			{!loading && !error && transactions.length === 0 && (
				<Typography variant="h6" className="clr-r" gutterBottom>
					No transactions found.
				</Typography>
			)}

			{!loading && !error && transactions.length > 0 && (
				<section data-testid="transactions-section">
					<TransactionsTable transactions={transactions} />
					<MonthlyRewardsTable transactions={transactions} />
					<TotalRewardsTable transactions={transactions} />
				</section>
			)}
		</Container>
	);
};

export default Dashboard;
