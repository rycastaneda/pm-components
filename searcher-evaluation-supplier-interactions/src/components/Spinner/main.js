import React from 'react';
import PropTypes from 'prop-types';

import { SpinnerDefault } from './styling/styledComponents';

const Spinner = () => <SpinnerDefault>Loading...</SpinnerDefault>;

Spinner.propTypes = {
    actions: PropTypes.object,
};

export default Spinner;
