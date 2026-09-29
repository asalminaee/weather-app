import { useState } from "react";

function App() {
  const [city, setCity] = useState("");

  async function getWeather() {
    if (!city.trim()) {
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=608a6d696a96e9c78cda94d040b583bf&units=metric`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="search">
      <img
        src="/img/location.png"
        alt="location"
        id="location"
      />

      <input
        type="text"
        placeholder="Enter City Name"
        id="input-value"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button id="srch-btn" onClick={getWeather}>
        Search
      </button>
    </div>
  );
}

export default App;