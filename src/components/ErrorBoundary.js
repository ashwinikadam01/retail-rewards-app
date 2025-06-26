import React, { Component } from 'react';
import { Alert } from '@mui/material';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, info: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, info) {
		this.setState({ info });
		// Log error to an external service
		console.error("ErrorBoundary caught an error", error, info);
	}

	render() {
		if (this.state.hasError) {
			return <Alert severity="error">Something went wrong!</Alert>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
