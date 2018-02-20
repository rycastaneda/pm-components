import styled from 'styled-components';

export const Button = styled.button`
    background: ${props => props.toggle ? 'palevioletred' : 'white'};
    color: ${props => props.toggle ? 'white' : 'palevioletred'};
    padding: 1em 2em;
    font-size: 1em;
    margin: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
`;


