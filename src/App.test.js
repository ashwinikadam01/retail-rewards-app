import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import App from './App';
import { fetchTransactions } from './api/fetchTransactions';

jest.mock('./api/fetchTransactions');

const originalConsoleError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (
        message.includes('An update to') && message.includes('inside a test was not wrapped in act') ||
        message.includes('Error fetching data') && message.includes('Failed to fetch')
      )
    ) {
      return;
    }
    originalConsoleError(...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
});

jest.mock('./api/fetchTransactions');

const mockData = [
  {
    id: 1,
    customerId: 101,
    name: 'Alice Smith',
    date: '2025-04-01',
    product: 'Running Shoes',
    amount: 120,
  },
  {
    id: 2,
    customerId: 102,
    name: 'Bob Johnson',
    date: '2025-05-10',
    product: 'T-shirt',
    amount: 75,
  },
];

describe('App component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading indicator initially', () => {
    fetchTransactions.mockResolvedValue([]);
    render(<App />);
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  test('renders dashboard and no transactions if none found', async () => {
    fetchTransactions.mockResolvedValue([]);
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Customer Rewards Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/No transactions found./i)).toBeInTheDocument();
  });

  test('renders transactions tables after loading', async () => {
    fetchTransactions.mockResolvedValue(mockData);
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Customer Rewards Dashboard/i)).toBeInTheDocument();

    const transactionsSection = screen.getByTestId('transactions-section');

    // Use getAllByText because "Alice Smith" apears multiple times in different tables
    const aliceElements = within(transactionsSection).getAllByText(/Alice Smith/i);
    expect(aliceElements.length).toBeGreaterThan(0);

    const bobElements = within(transactionsSection).getAllByText(/Bob Johnson/i);
    expect(bobElements.length).toBeGreaterThan(0);

    expect(screen.getByText(/Monthly Rewards/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Rewards/i)).toBeInTheDocument();
  });

  test('shows error message on fetch failure', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fetchTransactions.mockRejectedValue(new Error('Failed to fetch'));

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Failed to load transactions./i)).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error fetching data:'),
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
