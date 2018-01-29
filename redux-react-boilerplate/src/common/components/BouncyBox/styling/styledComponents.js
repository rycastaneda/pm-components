import  styled, { keyframes }  from 'styled-components';

const bounce = keyframes`
  0% { top: 0;}
  50% { top: -5px; }
  100% { top: 0;}
`;

export const HintWrap = styled.div`
    display: ${props => props.showDogeBox ? 'block' : 'none'};
    position: absolute;
    top: 0;
    left: 50px;
    width: 220px;
    margin: 51px auto;
    animation: ${bounce} 1s infinite;
`;

export const HintBox = styled.div`
    background: #222;
    padding: 10px;
    color: #fff;
`;

export const HintTriangle = styled.div`
    width: 0px;
    height: 0px;
    border: 20px solid rgba(0, 0, 0, 0);
    border-top: 35px solid #222;
    position: relative;
    z-index: -1;
    top: -10px;
    left: 160px;
    -webkit-transform: rotate(-22deg);
    -moz-transform: rotate(-22deg);
    -o-transform: rotate(-22deg);
    transform: rotate(-22deg);
`;

export const DogeContainer = styled.div`
    width: 100px;
    position: absolute;
    top: 80px;
    left: 80px;
    background-color: #5cb85c;
    height: 100px;
    overflow: hidden;
    border-radius: 100%;
    > img {
        width: 100%;
        margin-top: -10px;
    }
`;

