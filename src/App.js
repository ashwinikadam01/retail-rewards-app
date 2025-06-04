import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import transactionsData from './data/transactions';
import { calculatePoints } from './utils/rewardUtils';
import MonthlyRewardsTable from './components/MonthlyRewardsTable';
import TotalRewardsTable from './components/TotalRewardsTable';
import TransactionsTable from './components/TransactionsTable';
import { fetchTransactions } from './api/fetchTransactions';

function App() {
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
      <Typography variant="h4" gutterBottom>Customer Rewards Dashboard</Typography>
      {/* Loading Indicator */}
      {loading && <CircularProgress data-testid="loading-indicator" />}

      {/* Error Handling */}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && transactions.length === 0 && (
        <Typography variant="h6" className="clr-r" gutterBottom>
          No transactions found.
        </Typography>
      )}

      {/* Main Tables */}
      {!loading && !error && transactions.length > 0 && (
        <>
          <section data-testid="transactions-section">
            <TransactionsTable transactions={transactions} />
            <MonthlyRewardsTable transactions={transactions} />
            <TotalRewardsTable transactions={transactions} />
          </section>
        </>
      )}
    </Container>
  );
}

export default App;
