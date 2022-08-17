import styled from "styled-components";

const IndexContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        rgba(6, 23, 38, 0.8),
        rgba(6, 23, 38, 0.8),
        rgba(6, 23, 38, 0.8)
        ),
    url(${process.env.REACT_APP_PROXY}/media/images/HH_bg.jpg);
    background-size: cover;
`;

export default IndexContainer;