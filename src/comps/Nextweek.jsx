import {
  Stack,
  Text,
  Box,
  Flex,
  Container,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
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
          <CircularProgress isIndeterminate color="blue.300" />
        ) : (
          <Stack gap={10} direction={"column"}>
            {weekInfo.data.list.map((w, k) => {
              const d = new Date(w.dt * 1000);

              return (
                <Stack
                  key={k}
                  direction={"row"}
                  justifyContent={"space-evenly"}
                  verticalAlign="top"
                  textAlign={"center"}
                >
                  <Text style={{ flex: "1" }} color={"grey"}>
                    <b>
                      {addZero(d.getHours()) + ":" + addZero(d.getMinutes())}
                    </b>
                  </Text>

                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Weathericon size={16} iconId={w.weather[0].icon} />
                    <Text color={"white"}>
                      {"  " + w.weather[0].main}, {w.weather[0].description}
                    </Text>
                  </div>

                  <div style={{ flex: "1" }}>
                    <Text color={"grey"}>
                      {fixUnit(w.main.temp, weatherInfo.weatherUnit)}º
                    </Text>
                  </div>
                </Stack>
              );
            })}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default Nextweek;
