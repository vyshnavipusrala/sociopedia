import { useContext } from "react";
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Profile from "./Pages/Profile/Profile"
import Register from "./Pages/Register/Register"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./Pages/Messenger/Messenger";
const App = () => {
  const { user } = useContext(AuthContext);
  return (
     
    <Router>
       <Routes> 
        <Route path="/" element={user ? <Home /> : <Register />}/>  
        <Route  path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
        <Route  path="/register" element={user ? <Navigate to="/" /> : <Register />}/>
        <Route  path="/profile/:username" element={<Profile/>}/>
        <Route path="/messenger" element={
          !user?<Navigate to="/"/>:<Messenger/>
        }/>
      </Routes>
        
       
    </Router>
 
  )
}

export default App
