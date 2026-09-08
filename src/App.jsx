import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// BrowserRoutern - it enables routing for our application, means react start managing the browser URLs for this application.
// Routes - This contains all of our application's routes.
// Route - When the URL is /login, render the Login component. 