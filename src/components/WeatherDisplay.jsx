// components/WeatherDisplay.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const WeatherDisplay = () => {
const { lat, lon } = useParams();
const [weatherData, setWeatherData] = useState(null);

useEffect(() => {
    // Function to fetch weather data from the Open-Meteo API
    const fetchWeatherData = async () => {
try {
        const response = await axios.get(
        `https://open-meteo.com/api/v1/forecast?latitude=${lat}&longitude=${lon}`
        );
        setWeatherData(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
    };

    fetchWeatherData();
}, [lat, lon]);

if (!weatherData) {
    return <div>Loading...</div>;
}

  // Process and format weather data for the chart here
const chartData = weatherData.forecast.map((data) => ({
    name: data.datetime,
    temp: data.temperature,
}));

return (
    <div>
    <h2>Weather Display for Location: {lat}, {lon}</h2>
    <LineChart width={600} height={300} data={chartData}>
        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
    </LineChart>
    </div>
);
};

export default WeatherDisplay;
