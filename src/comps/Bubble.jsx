import { Box, Stack, Text } from "@chakra-ui/react";
import styled from "styled-components";
import Weathericon from "./Weathericon";

const Styledbox = styled(Box)`
  background-color: rgba(90, 24, 182, 1);

  border-radius: 30px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.22);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
`;

const Bubble = () => {
  return (
    <Styledbox>
      <Stack direction={"column"}>
        <Text color={"white"} fontSize="4xl">
          Hour
        </Text>
        <Weathericon />
        <Text>Weath</Text>
      </Stack>
    </Styledbox>
  );
};

export default Bubble;
