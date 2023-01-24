import { BsSun } from "react-icons/bs";
import {
  WiDayCloudyHigh,
  WiCloudy,
  WiRain,
  WiDayRainMix,
  WiThunderstorm,
  WiSnowflakeCold,
  WiNightClear,
  WiNightCloudy,
  WiNightAltRainWind,
  WiNightAltRainMix,
  WiNightCloudyHigh,
  WiNightStormShowers,
} from "react-icons/wi";

import { RiMistFill } from "react-icons/ri";

const Weathericon = ({ color = "white", size, iconId }) => {
  const twoLetters = iconId.substring(0, 2);
  const lastDigit = iconId.charAt(2);

  console.log(lastDigit);
  switch (twoLetters) {
    case "01":
      return lastDigit === "d" ? (
        <BsSun size={size} color={color} />
      ) : (
        <WiNightClear size={size} color={color} />
      );
    case "02":
      return lastDigit === "d" ? (
        <WiDayCloudyHigh size={size} color={color} />
      ) : (
        <WiNightCloudyHigh size={size} color={color} />
      );
    case "03":
      return lastDigit === "d" ? (
        <WiCloudy size={size} color={color} />
      ) : (
        <WiNightCloudy size={size} color={color} />
      );
    case "04":
      return lastDigit === "d" ? (
        <WiCloudy size={size} color={color} />
      ) : (
        <WiNightCloudy size={size} color={color} />
      );
    case "09":
      return lastDigit === "d" ? (
        <WiRain size={size} color={color} />
      ) : (
        <WiNightAltRainWind size={size} color={color} />
      );
    case "10":
      return lastDigit === "d" ? (
        <WiDayRainMix size={size} color={color} />
      ) : (
        <WiNightAltRainMix size={size} color={color} />
      );
    case "11":
      return lastDigit === "d" ? (
        <WiThunderstorm size={size} color={color} />
      ) : (
        <WiNightStormShowers size={size} color={color} />
      );
    case "13":
      return <WiSnowflakeCold size={size} color={color} />;
    case "50":
      return <RiMistFill size={size} color={color} />;
    default:
      return <BsSun size={size} color={color} />;
  }
};

export default Weathericon;
