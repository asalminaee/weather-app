import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    getWeather();
  };

  async function getWeather() {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=608a6d696a96e9c78cda94d040b583bf&units=metric`;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=608a6d696a96e9c78cda94d040b583bf&units=metric`;

    try {
      const currentResponse = await fetch(currentUrl);

      if (!currentResponse.ok) {
        throw new Error("City not found");
      }

      const currentData = await currentResponse.json();

      setWeather(currentData);

      const forecastResponse = await fetch(forecastUrl);

      if (!forecastResponse.ok) {
        throw new Error("Forecast not found");
      }

      const forecastData = await forecastResponse.json();

      showFiveDays(forecastData.list);
    } catch (error) {
      alert("Invalid city name. Please enter a valid city.");
      setWeather(null);
      setForecast([]);
    }
  }

function showFiveDays(data) {
  const days = [];

  data.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();

    if (!days.some((day) => day.date === date)) {
      days.push({
        date: date,
        temp: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      });
    }
  });

  console.log("5 days:", days);

  setForecast(days.slice(0, 5));
}

  return (
    <div>
      <form id="search" onSubmit={handleSubmit}>
        <img src="/img/location.png" alt="location" id="location" />

        <input
          type="text"
          placeholder="Enter City Name"
          id="input-value"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button id="srch-btn" type="submit">
          Search
        </button>
      </form>

      {weather && (
        <div id="current-weather">
          <h2>{weather.name}</h2>
          <h1>{Math.round(weather.main.temp)}°C</h1>
          <p>{weather.weather[0].description}</p>
          <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}

      <div id="forecast">
        {forecast.map((day, index) => (
          <div className="forecast-box" key={index}>
            <h3>{day.date}</h3>

            {/* <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
            /> */}

            <p>{Math.round(day.temp)}°C</p>

            <p>{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
