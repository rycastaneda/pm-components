import React from 'react';
import PropTypes from 'prop-types';
import { HintWrap, HintBox, HintTriangle, DogeContainer } from './styling/styledComponents';

const BouncyBox = ({ showDogeBox }) => (
    <HintWrap showDogeBox={showDogeBox}>
        <HintBox>
            Wow. Much cool. Such fancy. Such component. Amaze.
        </HintBox>
        <HintTriangle />
        <DogeContainer>
            <img src="http://dogecoin.com/imgs/doge.png" />
        </DogeContainer>
    </HintWrap>
);

BouncyBox.propTypes = {
    showDogeBox: PropTypes.bool.isRequired,
};

export default BouncyBox;
