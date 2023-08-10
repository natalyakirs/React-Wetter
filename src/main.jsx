import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Weather from './Weather.jsx';



import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([  // The following is the definition of the routes: array
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:lat/:lng", //to be able to pass the coordinates consisting of longitude and latitude in the URL--> create a URL with appropriate parameters `lat` (latitude) and `lng` (longitude)
    element: <Weather />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>,
);

//import { BrowserRouter } from 'react-router-dom'; // The BrowserRouter is responsible for handling the routing and navigation within the React application.


// .render(...): This method is used to render your App component and its child components inside the root fiber. In this case, it renders the App component wrapped inside <React.StrictMode>.
// The <React.StrictMode> component is used to enforce best practices and improve error handling during development. When using <React.StrictMode>, React will perform additional checks and warnings during development to help you identify potential problems and deprecations in your code.