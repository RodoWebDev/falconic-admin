import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.scss'

const Spinner = () => {
	return (
		<div className="spinner">
			<CircularProgress />
		</div>
	);
};

export default Spinner;
