//import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //  these components set up navigation and handle different views or pages in React application. The BrowserRouter is used as a wrapper around your components, and Route components define what content should be rendered based on the current URL. The Switch component ensures that only the first matching route is rendered.
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './components/Home';
import WeatherDisplay from './components/WeatherDisplay';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

const theme = createTheme({  //create a custom theme
  palette: {
    primary: {
      main: '#2196f3', // Customize the primary color
    },
    secondary: {
      main: '#f50057', // Customize the secondary color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes> {/* Use Routes instead of Router */}
          {/* The "element" prop is used to render the component for each route */}
          <Route path="/" element={<Home />} />
          {/* Use the "path" prop to define the URL pattern and "element" to render the component */}
          <Route path="/weather/:lat/:lon" element={<WeatherDisplay />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;