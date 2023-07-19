// src/Home.jsx
import React, { useState } from 'react';  //useState function is a hook in React that allows to add state to functional components.
import { Link } from 'react-router-dom'; //The Link component is used for creating navigation links in the application.
import { Button, TextField } from '@mui/material';

const Home = () => {
const [locationName, setLocationName] = useState(''); // The useState hook returns an array with two elements: the state variable (in this case, locationName) and a function to update the state (in this case, setLocationName).
// useState('') -> initial value of the locationName state variable is an empty string.


// Event handler for input change: such as a text input or a form element. 
//When the user types something in the input field, the function is called with an event object that contains information about the event. 
//The setLocationName function is then called with the value entered by the user (e.target.value), and it updates the state variable locationName with the new value.
const handleInputChange = (e) => {
    setLocationName(e.target.value);
};

return (
    <div className="home-container">   {/* TextField component from Material-UI; this is an input field where the user can enter a location name */}
    <TextField
        label="Enter location name"  // The label displayed above the input field
        value={locationName}  // The value of the input field, set to the 'locationName' state
        onChange={handleInputChange}  // The event handler to call when the user types something
        variant="outlined"   // The visual style of the input field
    />

    <Link
        to={`/weather/${encodeURIComponent(locationName)}`}
        style={{ textDecoration: 'none' }}
    >

{/* Button component from Material-UI -> to get the weather for the entered location */}
        <Button variant="contained" color="primary">
        Get Weather
        </Button>
    </Link>
    </div>
);
};

export default Home;
