import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const RewardsTable = ({ title, headers, rows, rowRenderer }) => (
	<Paper className='m-tb-20'>
		<h3 className='m-tb-10'>{title}</h3>
		<Table className='table'>
			<TableHead>
				<TableRow className="table-header">
					{headers.map((header, idx) => (
						<TableCell key={idx}>{header}</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{rows.map((row, idx) => (
					<TableRow key={idx} className="hover-row">
						{rowRenderer(row)}
					</TableRow>
				))}
			</TableBody>
		</Table>
	</Paper>
);

export default RewardsTable;
