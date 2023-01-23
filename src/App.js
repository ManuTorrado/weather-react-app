import {
  Box,
  ChakraProvider,
  Container,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Infocard from "./comps/Infocard";
import Nextweek from "./comps/Nextweek";
import { IconContext } from "react-icons";

export const WeatherContext = createContext("weather");

function App() {
  const [locationInfo, setLocationInfo] = useState({});
  const [fetchingData, setFetchingData] = useState(true);

  const [weatherUnit, setWeatherUnit] = useState(1); // 0 for Celsius, 1 for Kelvin, 2 for fahrenheit
  const [weekInfo, setWeekInfo] = useState({});
  const [position, setPosition] = useState({
    lat: "-34.6020134",
    long: "-58.4746973",
  });

  const weatherInfo = {
    locationInfo,
    fetchingData,
    weatherUnit,

    setWeatherUnit,
    weekInfo,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((p) => {
      setPosition({
        lat: p.coords.latitude,
        long: p.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.long}&appid=${process.env.REACT_APP_KEY}`;

      setFetchingData(true);
      const res = await axios.get(URL);

      setLocationInfo(res);
      setFetchingData(false);
    };

    const fetchWeek = async () => {
      const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${
        position.lat
      }&lon=${position.long}&cnt=${5}&appid=${process.env.REACT_APP_KEY}`;
      const res = await axios.get(URL);

      setWeekInfo(res);
    };

    fetchWeek();
    fetchLocation();
  }, [position]);

  return (
    <WeatherContext.Provider value={weatherInfo}>
      <IconContext.Provider
        value={{ color: "white", className: "global-class-name" }}
      >
        <ChakraProvider>
          <Box
            style={{
              width: "100vw",
              height: "100vh",
              background: "rgb(45, 20, 57)",
              background:
                "linear-gradient(129deg, rgba(45, 20, 57, 1) 0%, rgba(26, 8, 51, 1) 50%,rgba(36, 4, 82, 1) 100%)",
            }}
          >
            {fetchingData ? (
              <h1>Loading...</h1>
            ) : (
              <>
                <Container>
                  <Nextweek />
                </Container>
              </>
            )}
          </Box>
        </ChakraProvider>
      </IconContext.Provider>
    </WeatherContext.Provider>
  );
}

export default App;
