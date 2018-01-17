import styled from 'styled-components';

export const FilterMainContainer = styled.div`
	display: ${props => !props.toggleFilterShow ? 'none' : 'block'};
	
`;

export const FilterApplyButton = styled.button`
    margin-right: 1rem;
`;

export const FilterClearButton = styled.button`
    margin-right: 1rem;
`;
