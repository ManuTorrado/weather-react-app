import Box from "./Box";
import { Circle } from "./Forms";
import {
  Button,
  ButtonGroup,
  Center,
  CircularProgress,
  position,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../App";
import Weathericon from "./Weathericon";
import { fixUnit } from "../utils/units";

const Infocard = ({ coords }) => {
  const weatherInfo = useContext(WeatherContext);
  const [fetchingData, setFetchingData] = useState(true);
  const [locationInfo, setLocationInfo] = useState({});

  const setKelvin = () => weatherInfo.setWeatherUnit(1);
  const setCelsius = () => weatherInfo.setWeatherUnit(0);
  const setFahrenheit = () => weatherInfo.setWeatherUnit(2);
  const date = new Date();
  const days = [
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchLocation = async () => {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${process.env.REACT_APP_KEY}`;

      setFetchingData(true);
      const res = await axios.get(URL);

      setLocationInfo(res);
      setFetchingData(false);
    };

    fetchLocation();
    console.log(locationInfo);
  }, [coords]);

  return (
    <Box color={"#7c0c6d"} radius={"20px"}>
      <Box color={"#3b0c7c"} radius={"20px"}>
        {fetchingData ? (
          <Center>
            {" "}
            <CircularProgress isIndeterminate color="blue.300" />
          </Center>
        ) : (
          <div>
            <div
              style={{
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Text as={"b"} fontSize="1xl" color="white">
                {locationInfo.data.sys.country}, {locationInfo.data.name}
              </Text>
              <Center>
                <Weathericon
                  iconId={locationInfo.data.weather[0].icon}
                  size={"55px"}
                  color={"white"}
                />
              </Center>
              <Text fontSize="4xl" color="white">
                {" "}
                <b>
                  {fixUnit(
                    locationInfo.data.main.temp,
                    weatherInfo.weatherUnit
                  )}
                  º{" "}
                </b>
              </Text>

              <Text fontSize="1xl" color="white">
                {locationInfo.data.weather[0].main}
                {", "}
                {locationInfo.data.weather[0].description}
              </Text>

              <Text color="white">
                {days[date.getDay()] +
                  ", " +
                  date.getDate() +
                  " " +
                  months[date.getMonth()] +
                  " " +
                  date.getFullYear()}
              </Text>
              <ButtonGroup
                colorScheme="purple"
                color={"white"}
                variant="outline"
                isAttached
              >
                <Button
                  variant={weatherInfo.weatherUnit == 1 ? "solid" : "outline"}
                  onClick={setKelvin}
                >
                  K
                </Button>
                <Button
                  variant={weatherInfo.weatherUnit == 0 ? "solid" : "outline"}
                  onClick={setCelsius}
                >
                  C
                </Button>
                <Button
                  variant={weatherInfo.weatherUnit == 2 ? "solid" : "outline"}
                  onClick={setFahrenheit}
                >
                  F
                </Button>
              </ButtonGroup>
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Infocard;
