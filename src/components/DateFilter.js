import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const getDefaultFromDate = () => dayjs('2024-12-01');
const getDefaultToDate = () => dayjs();

const DateFilter = ({ onFilter, onReset, loading }) => {
  const [fromDate, setFromDate] = useState(getDefaultFromDate());
  const [toDate, setToDate] = useState(getDefaultToDate());
  const [error, setError] = useState('');

  const handleFilter = async () => {
    if (fromDate.isAfter(toDate)) {
      setError('From Date must be before or equal to To Date');
      return;
    }
    setError('');
    await onFilter(fromDate, toDate);
  };

  const handleReset = async () => {
    const defaultFrom = getDefaultFromDate();
    const defaultTo = getDefaultToDate();
    setFromDate(defaultFrom);
    setToDate(defaultTo);
    setError('');
    await onReset(defaultFrom, defaultTo);
  };

  useEffect(() => {
    if (fromDate.isAfter(toDate)) {
      setError('From Date must be before or equal to To Date');
    } else {
      setError('');
    }
  }, [fromDate, toDate]);

  return (
    <Box className="date-filter-container">
			<Typography className="m-0 "> Filter by: </Typography>

      <Box className="date-filter-input">
        <DatePicker
          label="From Date"
          value={fromDate}
          onChange={(newDate) => setFromDate(newDate)}
          maxDate={toDate}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              size: 'small',
              fullWidth: true,
              className: 'date-filter-textfield 111'
            }
          }}
        />
      </Box>

      <Box className="date-filter-input">
        <DatePicker
          label="To Date"
          value={toDate}
          onChange={(newDate) => setToDate(newDate)}
          minDate={fromDate}
          maxDate={dayjs()}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              size: 'small',
              fullWidth: true,
              className: 'date-filter-textfield'
            }
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleFilter}
        disabled={!!error || loading}
        className="date-filter-button"
      >
        Filter
      </Button>

      <Button
        variant="outlined"
        onClick={handleReset}
        disabled={loading}
        className="date-filter-button"
      >
        Reset
      </Button>

      {error && (
        <Typography variant="body2" className="date-filter-error">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default DateFilter;
