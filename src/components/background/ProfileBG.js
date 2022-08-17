import styled from "styled-components";

const ProfileContainer = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        rgba(6, 23, 38, 0.9),
        rgba(6, 23, 38, 0.9),
        rgba(6, 23, 38, 0.9)
        ),
    url(${process.env.REACT_APP_PROXY}/media/images/HH_bg.jpg);
    background-size: cover;
`;

export default ProfileContainer;