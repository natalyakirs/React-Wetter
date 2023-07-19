import React from 'react'
import ReactDOM from 'react-dom/client'
//import { BrowserRouter } from 'react-router-dom'; // The BrowserRouter is responsible for handling the routing and navigation within the React application.
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render( //  This creates a root React render subtree (root fiber) that is used for concurrent mode rendering. The document.getElementById('root') is the DOM element where your React app will be mounted. It finds the element with the ID 'root' and prepares it to be used as the root for your React app.
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)

// .render(...): This method is used to render your App component and its child components inside the root fiber. In this case, it renders the App component wrapped inside <React.StrictMode>.
// The <React.StrictMode> component is used to enforce best practices and improve error handling during development. When using <React.StrictMode>, React will perform additional checks and warnings during development to help you identify potential problems and deprecations in your code.