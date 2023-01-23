import { Stack, Text, Box, Flex, Container, Center } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import Bubble from "./Bubble";
import { WeatherContext } from "../App";
import Weathericon from "./Weathericon";
import Infocard from "./Infocard";

const kelvinToCelsius = (kel) => Math.round(kel - 273.15);

const celsiusToKelvin = (cel) => Math.round(cel + 273.15);

const Nextweek = () => {
  const weatherInfo = useContext(WeatherContext);

  const selectWeather = (weather) => {};

  const days = ["Mon", "Tue", "Wed", " Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    console.log("-----");
    console.log(weatherInfo.weekInfo.data.list);
    console.log("-----");
  });
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
            const d = new Date(w.dt);
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
                  <b>{days[d.getDay()]}</b>
                </Text>

                <div>
                  <h3 color={"grey"}>
                    {" "}
                    <Weathericon iconId={w.weather[0].icon} />
                    {w.weather[0].main}, {w.weather[0].description}
                  </h3>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text color={"grey"}>{w.main.temp} º</Text>
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
