import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom'; //


export default function App() {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();//



  return (
    <>
      <TextField
        label="Standort"
        onChange={(event) => {
          setLocation(event.target.value);
        }}
        value={location}
      />

      <Button
  onClick={async () => {      // TODO: handle click  --> alert('clicked');
    try {
      const cleanLocation = encodeURIComponent(location.trim());
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cleanLocation}`);
      const data = await response.json();
      setResults(data.results);
    } catch(err) {
      console.error(err);
    }
  }}
>Senden</Button>

<List>
  { results.map((location) => {
    return (
      <ListItem key={location.id}>

        <ListItemButton
        onClick={() => {
  const lat = location.latitude.toString().replace('.', '_');
  const lng = location.longitude.toString().replace('.', '_');
  navigate(`/${lat}/${lng}`);
}}>
        
          <ListItemText
            primary={location.name}
            secondary={location.admin1 ? `${location.admin1}, ${location.country}` : location.country}
          />
        </ListItemButton>
      </ListItem>
    );
  }) }
</List>
    </>
  );
}

