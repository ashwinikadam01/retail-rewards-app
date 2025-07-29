import React, { useState } from 'react';
import {
	Table, TableHead, TableBody, TableRow, TableCell,
	TableSortLabel, TablePagination, TextField, Box
} from '@mui/material';

const SortableTable = ({ data, columns, tableHeader, tableSubHeader, mainHeader }) => {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [filterText, setFilterText] = useState('');

	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => setPage(newPage);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleFilterChange = (event) => {
		setFilterText(event.target.value.toLowerCase());
		setPage(0);
	};

	const filteredData = data.filter((row) =>
		Object.values(row).some(val =>
			String(val).toLowerCase().includes(filterText)
		)
	);

	const sortedData = [...filteredData].sort((a, b) => {
		if (orderBy) {
			const aValue = a[orderBy];
			const bValue = b[orderBy];
			if (aValue < bValue) return order === 'asc' ? -1 : 1;
			if (aValue > bValue) return order === 'asc' ? 1 : -1;
		}
		return 0;
	});

	const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return (
		<Box className="m-tb-30">
			{mainHeader && <h3 className="m-0" >{mainHeader}</h3>}
			<Box display="flex" justifyContent="space-between" alignItems="center" className="m-b-10">
				{tableHeader && <h3 className="m-tb-10" >{tableHeader}</h3>}
        {tableSubHeader && <h4 className="m-b-10 clr-sub-header">{tableSubHeader}</h4>}
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={filterText}
          onChange={handleFilterChange}
          className="m-b-10 w-25-per d-flex flt-right"
          inputProps={{ autoComplete: 'off' }}
        />
      </Box>
			<Table className="table">
				<TableHead>
					<TableRow className="table-header">
						{columns.map((col) => (
							<TableCell key={col.id} className="table-cell-bordered">
								<TableSortLabel
									active={orderBy === col.id}
									direction={orderBy === col.id ? order : 'asc'}
									onClick={() => handleRequestSort(col.id)}
								>
									{col.label}
								</TableSortLabel>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{paginatedData.map((row, i) => (
						<TableRow key={i} className="hover-row">
							{columns.map((col) => (
								<TableCell key={col.id} className="table-cell-bordered">{row[col.id]}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<TablePagination
				component="div"
				count={sortedData.length}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
				className="table-pagination-bordered custom-pagination"
			/>
		</Box>
	);
};

export default SortableTable;
