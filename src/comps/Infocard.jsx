import Box from "./Box";
import { Circle } from "./Forms";
import {
  Button,
  ButtonGroup,
  Center,
  position,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../App";
import Weathericon from "./Weathericon";

const kelvinToCelsius = (kel) => Math.round(kel - 273.15);

const celsiusToKelvin = (cel) => Math.round(cel + 273.15);

const Infocard = () => {
  const weatherInfo = useContext(WeatherContext);
  const date = new Date();
  const days = [
    "Monday",
    "Thuesday",
    "Wednesday",
    " Thursday",
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
  return (
    <Box radius={"20px"}>
      {weatherInfo.fetchingData ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <div
            style={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Text as={"b"} cfontSize="1xl" color="white">
              {weatherInfo.locationInfo.data.sys.country},{" "}
              {weatherInfo.locationInfo.data.name}
            </Text>
            <Center>
              <Weathericon size={"55px"} color={"yellow"} />
            </Center>
            <Text fontSize="4xl" color="white">
              {" "}
              <b>
                {kelvinToCelsius(weatherInfo.locationInfo.data.main.temp)}º{" "}
              </b>
            </Text>

            <Text fontSize="1xl" color="white">
              {weatherInfo.locationInfo.data.weather[0].main}
              {", "}
              {weatherInfo.locationInfo.data.weather[0].description}
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

            <ButtonGroup isAttached>
              <Button>K</Button>
              <Button>C</Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Infocard;
