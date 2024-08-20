import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import ManagePoll from "./components/ManagePoll"
import Profile from "./components/Profile/profile"
import Home from "./components/Home/Home";
import './App.css';

function App() {
	const user = localStorage.getItem("token");

	return (
		// <Routes>
		// 	{user && <Route path="/" exact element={<Main />} />}
		// 	<Route path="/signup" exact element={<Signup />} />
		// 	<Route path="/login" exact element={<Login />} />
		// 	<Route path="/" element={<Navigate replace to="/login" />} />
		// </Routes>
		<div className="App">
      {/* Conditional rendering of Main component based on user */}
      {user && <Main />} {/* Render the Main component if user is logged in */}
      
      <Routes>
        {/* Routes accessible without Main component */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Routes accessible only when logged in */}
        {user && (
          <>
            <Route path="/" element={<Navigate replace to="/Home" />} />
            <Route path="/manage-poll" element={<ManagePoll />} />
            <Route path="/home" element={<Home />} />
			<Route path="/profile" element={<Profile />} />
            {/* Add more routes as needed */}
          </>
        )}
        
        {/* Redirect to login if user is not logged in */}
        {!user && <Route path="/" element={<Navigate replace to="/login" />} />}
      </Routes>
    </div>
		
	);
}

export default App;