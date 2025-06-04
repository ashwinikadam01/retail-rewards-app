# Retailer Rewards Program - React App

## Overview
This React app calculates customer reward points based on purchase transactions, displaying per-transaction points, monthly totals and overall totals.

## Features
- Async simulated API fetching transaction data
- Calculation of reward points per rules:
    - 2 points per dollar over $100
    - 1 point per dollar between $50 and $100
- Displays data in 3 tables using Material UI:
  - Transactions with reward points
  - Customer monthly rewards
  - Customer total rewards
- Pure React with hooks, no Redux

## Setup
1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000` in your browser

## Directory Structure
- `src/`
	- `App.js` - Main container
	- `TransactionsTable.js` - Table for transactions
	- `MonthlyRewardsTable.js` - Table for monthly rewards
	- `TotalRewardsTable.js ` - Table for total rewards
	- `index.js` - React entry point

## Approach
- Data is fetched asynchronously (simulated by `setTimeout`).
- Reward points calculated per transaction on load.
- Data aggregated for monthly and total reward view.
- Material UI tables provide responsive UI.

## Error Handling and Edge Cases
- Handles transactions with price < 50 (0 points)
- Supports multiple months and years
- Loading spinner shown during data fetch

---
