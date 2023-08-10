import { useParams } from "react-router-dom";
import { CircularProgress } from '@mui/material';

//Import hooks for managing state and side effects
import { useEffect } from "react";// built-in React hook that allows to perform side effects in functional components. Side effects include things like data fetching, subscriptions, or manually changing the DOM. It's often used for tasks that would typically be done in lifecycle methods of class components, like componentDidMount, componentDidUpdate, and componentWillUnmount.
import { useState } from 'react';// built-in React hook that allows to add state management to functional components. It enables you to store and update state within a component without the need for class components and this.setState

import { ResponsiveLine } from '@nivo/line';// Import the line chart component

export default function Weather() {

    // Extract latitude and longitude parameters from the URL
    const { lat, lng } = useParams();//
    const latitude = lat.replace('_', '.');
    const longitude = lng.replace('_', '.');

    // State for weather data and loading indicator
    const [weatherData, setWeatherData] = useState([]);//array
    const [loading, setLoading] = useState(false);//boolean output

// Data object to hold temperature data for the chart
    const chartData = {   //
        id: 'Temperatur',
        data: [],
    };

    useEffect(  //Fetch weather data from API based on latitude and longitude
        () => {
        async function loadData() {
            try {
            setLoading(true);// Set loading state to true
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
            const data = await response.json();
            setWeatherData(data);// Update weather data state
            setLoading(false);// Set loading state back to false
            } catch (err) {
            console.error(err);
            setLoading(false);
            }
        }
    
        loadData();
        },
        [latitude, longitude]
    );
    
    if (loading) {
        return (
        <CircularProgress />
        );
    }


    if (  //
        weatherData && weatherData.hourly &&
        Array.isArray(weatherData.hourly.time) &&
        Array.isArray(weatherData.hourly.temperature_2m)
    ) {
        const chartEntries = weatherData.hourly.time.map((time, i) => ({
        x: new Date(time),
        y: weatherData.hourly.temperature_2m[i],
        }));
    
        chartData.data = chartEntries;
    }


    return (
        <div
        style={{
        padding: 10,
        width: '80vw',
        height: '80vh',
        boxSizing: 'border-box',
        }}
    >
        
        <ResponsiveLine  //THE GRAPH
        data={[chartData]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
xScale={{
    type: 'time',
}}
xFormat={(time) => {
    return time.toLocaleString('de-DE');
}}
yScale={{ //Temperature
    type: 'linear',
    min: -30,
    max: 50,
    stacked: true,
    reverse: false
}}
yFormat=" >-.2f"
axisTop={null}
axisRight={null}
axisBottom={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 30, //The date angle toward OX
    tickValues: 'every day',
    format: (time) => time.toLocaleDateString('de-DE'),
    legend: 'Time',
    legendOffset: 36,
    legendPosition: 'left'
}}
axisLeft={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Temperature',
    legendOffset: -40,
    legendPosition: 'start'
}}
pointSize={10}
pointColor={{ theme: 'background' }}
pointBorderWidth={2}
pointBorderColor={{ from: 'serieColor' }}
pointLabelYOffset={-12}
useMesh={true}
legends={[
    {
    anchor: 'bottom-right',
    direction: 'column',
    justify: false,
    translateX: 100,
    translateY: 0,
    itemsSpacing: 0,
    itemDirection: 'left-to-right',
    itemWidth: 80,
    itemHeight: 20,
    itemOpacity: 0.75,
    symbolSize: 12,
    symbolShape: 'circle',
    symbolBorderColor: 'rgba(0, 0, 0, .5)',
    effects: [
        {
        on: 'hover',
        style: {
            itemBackground: 'rgba(0, 0, 0, .03)',
            itemOpacity: 1
        }
        }
    ]
    }
]}


        />
    </div>
    );
}