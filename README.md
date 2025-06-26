# Retailer Rewards Program - React App

## Overview
This React app calculates customer reward points based on purchase transactions, displaying per-transaction points, monthly totals, and overall totals.

## Features
- Async simulated API fetching transaction data
- Calculation of reward points per rules:
  - 2 points per dollar over $100
  - 1 point per dollar between $50 and $100
- Display data in 3 tables using Material UI:
  - Transactions with reward points
  - Customer monthly rewards
  - Customer total rewards
- Pure React with hooks, no Redux

## Setup
1. Run `git clone https://github.com/ashwinikadam01/retail-rewards-app.git`
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000` in your browser


## 📸 Screenshots

- 🧾 Transactions Table
![Transactions Table](screenshots/transactions-table.png)

- 📅 Monthly Rewards
![Monthly Rewards Table](screenshots/monthly-rewards.png)

- 🏆 Total Rewards
![Total Rewards Table](screenshots/total-rewards.png)
> *(Place your screenshots in a `/screenshots` folder in your project root.)*


## ✅ Unit Test Results

Run tests using:

```bash
npm test -- --watchAll=false


## Directory Structure
- `src/`
  - `App.js` - main container
  - `TransactionsTable.js` - table for transactions
  - `MonthlyRewardsTable.js` - table for monthly rewards
  - `TotalRewardsTable.js` - table for total rewards
  - `index.js` - React entry point

## Approach
- Data is fetched asynchronously (simulated by `setTimeout`).
- Reward points calculated per transaction on load.
- Data aggregated for monthly and total reward views.
- Material UI tables provide responsive UI.

## Errors and Edge Cases
- Handles transactions with price < 50 (0 points)
- Supports multiple months and years
- Loading spinner shown during data fetch


---