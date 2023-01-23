import styled from "styled-components";

const Box = styled.div`
  border-radius: ${(props) => props.radius};
  padding-bottom: 10px;
  background: ${(props) => props.color};
`;

export default Box;
