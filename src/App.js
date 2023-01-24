import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Infocard from "./comps/Infocard";
import Nextweek from "./comps/Nextweek";
import { IconContext } from "react-icons";

export const WeatherContext = createContext("weather");

function App() {
  const [weatherUnit, setWeatherUnit] = useState(1); // 0 for Celsius, 1 for Kelvin, 2 for fahrenheit
  const [isGeoEnabled, setGeoEnabled] = useState(true);
  const [mapCoords, setMapCoords] = useState({
    lat: "51.5287352",
    long: "-0.3817841",
  });

  const weatherInfo = {
    weatherUnit,
    setWeatherUnit,
  };

  useEffect(() => {
    const opt = {
      // timeout:INFINITY,
      // maximumAge:INFINITY,
      // accuracy: { ios: "hundredMeters", android: "balanced" },
      // enableHighAccuracy: false,
      // distanceFilter:0,
      showLocationDialog: true,
      forceRequestLocation: true,
    };

    const getLocation = () => {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, opt)
      );
    };

    const location = async () => {
      try {
        const res = await getLocation();

        return setMapCoords({
          lat: res.coords.latitude,
          long: res.coords.longitude,
        });
      } catch (err) {
        if (err.code == 1) return setGeoEnabled(false);
      }
    };

    location();
  }, []);

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
            <>
              <Container>
                {!isGeoEnabled ? (
                  <Box
                    style={{ backgroundColor: "white", borderRadius: "15px" }}
                  >
                    <Text color={"black"}>Habilita la ubicacion</Text>
                  </Box>
                ) : (
                  <>
                    <Nextweek coords={mapCoords} />
                  </>
                )}
              </Container>
            </>
          </Box>
        </ChakraProvider>
      </IconContext.Provider>
    </WeatherContext.Provider>
  );
}

export default App;
