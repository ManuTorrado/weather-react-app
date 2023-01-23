const kelvinToCelsius = (kel) => Math.round(kel - 273.15);

const kelvinToFahrenheit = (kel) => {
  const aux = (kel - 273.15) * 1.8;
  return Math.round(aux + 32);
};

const fixUnit = (w, unit) => {
  switch (unit) {
    case 0:
      return kelvinToCelsius(w);
    case 1:
      return Math.round(w);

    case 2:
      return kelvinToFahrenheit(w);
    default:
      return Math.round(w);
  }
};

export { kelvinToCelsius, kelvinToFahrenheit, fixUnit };
