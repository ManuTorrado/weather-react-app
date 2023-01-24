import { Stack, Text, Box, Flex, Container, Center } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import Bubble from "./Bubble";
import { WeatherContext } from "../App";
import Weathericon from "./Weathericon";
import Infocard from "./Infocard";
import { fixUnit } from "../utils/units";

const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};
const Nextweek = () => {
  const weatherInfo = useContext(WeatherContext);

  const days = ["Mon", "Tue", "Wed", " Thu", "Fri", "Sat", "Sun"];

  return (
    <Box
      style={{
        backgroundColor: "#010314",
        borderTopRightRadius: "35px",
        borderTopLeftRadius: " 35px",
        height: "100vh",
      }}
    >
      <Infocard />
      <br />
      <Container>
        <Stack spacing={10} direction={"column"} align="stretch">
          {weatherInfo.weekInfo.data.list.map((w, k) => {
            const d = new Date(w.dt * 1000);

            return (
              <Box
                key={k}
                style={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text color={"grey"}>
                  <b>{addZero(d.getHours()) + ":" + addZero(d.getMinutes())}</b>
                </Text>

                <div
                  style={{
                    display: "flex",
                    alignItems: "left",
                    textAlign: "left",
                  }}
                >
                  {" "}
                  <Weathericon iconId={w.weather[0].icon} />
                  <h3 style={{ textAlign: "left", color: "whtie" }}>
                    {"  "}
                    {w.weather[0].main}, {w.weather[0].description}
                  </h3>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text color={"grey"}>
                    {fixUnit(w.main.temp, weatherInfo.weatherUnit)}º
                  </Text>
                </div>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
};

export default Nextweek;
