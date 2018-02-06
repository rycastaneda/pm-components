import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styling/styledComponents';

const PmButton = ({ onclick, children, toggle }) => (
    <div>
        <Button onClick={onclick} toggle={toggle}>
            {children}
        </Button>
    </div>
);

PmButton.propTypes = {
    onclick: PropTypes.func.isRequired,
    toggle: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
};

PmButton.defaultProps = {
    toggle: false,
};

export default PmButton;
