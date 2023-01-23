import styled from "styled-components";

const Circle = styled.div`
    border-radius: 50%;
    background-color: ${props => props.color};
    padding: 10px;
`;

export {Circle}