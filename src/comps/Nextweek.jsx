import { Stack, Text, Box, Flex, Container, Center } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Bubble from "./Bubble";
import { WeatherContext } from "../App";
import Weathericon from "./Weathericon";
import Infocard from "./Infocard";
import { fixUnit } from "../utils/units";
import axios from "axios";

const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};
const Nextweek = ({ coords }) => {
  const weatherInfo = useContext(WeatherContext);
  const [weekInfo, setWeekInfo] = useState({});
  const [fetchingData, setFetchingData] = useState(true);
  const days = ["Mon", "Tue", "Wed", " Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    const fetchWeek = async () => {
      setFetchingData(true);
      const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${
        coords.lat
      }&lon=${coords.long}&cnt=${5}&appid=${process.env.REACT_APP_KEY}`;
      const res = await axios.get(URL);
      console.log(res);
      setWeekInfo(res);
      setFetchingData(false);
    };

    fetchWeek();
  }, [coords]);

  return (
    <Box
      style={{
        backgroundColor: "#010314",
        borderTopRightRadius: "35px",
        borderTopLeftRadius: " 35px",
        height: "100vh",
      }}
    >
      <Infocard coords={coords} />
      <br />
      <Container>
        {fetchingData ? (
          <></>
        ) : (
          <Stack spacing={10} direction={"column"} align="stretch">
            {weekInfo.data.list.map((w, k) => {
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
                    <b>
                      {addZero(d.getHours()) + ":" + addZero(d.getMinutes())}
                    </b>
                  </Text>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "left",
                      textAlign: "left",
                    }}
                  >
                    {" "}
                    <Weathericon size={16} iconId={w.weather[0].icon} /> {"  "}
                    <h3 style={{ textAlign: "left", color: "whtie" }}>
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
        )}
      </Container>
    </Box>
  );
};

export default Nextweek;
