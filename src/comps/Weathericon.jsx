import { BsSun } from "react-icons/bs";
import {
  WiDayCloudyHigh,
  WiCloudy,
  WiRain,
  WiDayRainMix,
  WiThunderstorm,
  WiSnowflakeCold,
} from "react-icons/wi";

import { RiMistFill } from "react-icons/ri";

const Weathericon = ({ color, size, iconId }) => {
  switch (iconId) {
    case "01d":
      return <BsSun size={size} color={color} />;
    case "02d":
      return <WiDayCloudyHigh />;
    case "03d":
      return <WiCloudy size={size} color={color} />;
    case "04d":
      return <WiCloudy size={size} color={color} />;
    case "09d":
      return <WiRain />;
    case "10d":
      return <WiDayRainMix />;
    case "11d":
      return <WiThunderstorm />;
    case "13d":
      return <WiSnowflakeCold />;
    case "50d":
      return <RiMistFill />;
    default:
      return <BsSun size={size} color={color} />;
  }
};

export default Weathericon;
