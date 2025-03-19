import React from 'react'
import {useState, useEffect} from 'react'

const API_KEY = "Your API";

function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   

  // Fatching Data 
  const fetchWeather = async (cityName)=>{
    setLoading(true);
    setError(null);
    try{
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
     if(!response.ok){
    throw new Error("city not found");
}
      const data = await response.json();
      setWeather(data);
  }
    catch (err){
        setError(err.message);
        setWeather(null)}
    setLoading(null);
}

    useEffect(() => {
      fetchWeather(city);
    }, [])
    
  

  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-95 text-center">
        <h1 className="text-center font-bold text-gray-700"> Weather App</h1>
        <div className="mt-4 flext">
          <input
            type="text"
            placeholder="Enter City...0"
            value={city}
            className="w-full p-2 border rounded-lg hover:bg-blue-600"
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={() => fetchWeather(city)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {" "}
            Search
          </button>
        </div>

        {loading && <p className="mt-4 text-gray-500">Loading...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {weather && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-lg text-gray-600">
              {weather.weather[0].description}
            </p>
            <p className="text-4xl font-bold text-gray-800">
              {weather.main.temp}°C
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
