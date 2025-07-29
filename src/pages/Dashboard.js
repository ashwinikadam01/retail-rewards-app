import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Backdrop } from '@mui/material';
import { fetchTransactions } from '../api/fetchTransactions';
import { calculatePoints } from '../utils/rewardUtils';
import TransactionsTable from '../components/TransactionsTable';
import MonthlyRewardsTable from '../components/MonthlyRewardsTable';
import TotalRewardsTable from '../components/TotalRewardsTable';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';
import DateFilter from '../components/DateFilter';  // your date filter component

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // initial loading for data fetch
  const [error, setError] = useState(null);

  // Fetch all data initially
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTransactions();
      const enrichedData = data.map(tx => ({
        ...tx,
        rewardPoints: calculatePoints(tx.amount),
      }));
      setTransactions(enrichedData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load transactions.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (fromDate, toDate) => {
		setLoading(true);
		try {
			const allData = await fetchTransactions(); // optional: if needed to re-filter original data
			const enrichedData = allData.map(tx => ({
				...tx,
				rewardPoints: calculatePoints(tx.amount),
			}));

			const filtered = enrichedData.filter(tx => {
				const txDate = new Date(tx.date);
				return (
					txDate >= fromDate.toDate() &&
					txDate <= toDate.toDate()
				);
			});

			setTransactions(filtered);
		} catch (err) {
			console.error('Filter Error:', err);
			setError('Failed to filter transactions.');
		} finally {
			setLoading(false);
		}
	};

  // Handler for reset
  const handleReset = async () => {
    await fetchData();  // refetch all data and reset
  };

  return (
    <Container maxWidth={false} className="m-0 p-15">
      <h3 className="m-0"> Customer Rewards Dashboard </h3>

      <DateFilter onFilter={handleFilter} onReset={handleReset} loading={loading} />

      {loading && 
				<Backdrop open={loading} sx={{ zIndex: 1300, color: '#fff' }}>
					<CircularProgress color="inherit" />
				</Backdrop>
			}

      {error && <ErrorAlert message={error} />}

      {!loading && !error && transactions.length === 0 && (
        <Typography variant="h6" className="clr-r" gutterBottom>
          No transactions found.
        </Typography>
      )}

      {!loading && !error && transactions.length > 0 && (
        <section data-testid="transactions-section">
          <MonthlyRewardsTable transactions={transactions} />
          <TotalRewardsTable transactions={transactions} />
          <TransactionsTable transactions={transactions} />
        </section>
      )}
    </Container>
  );
};

export default Dashboard;
