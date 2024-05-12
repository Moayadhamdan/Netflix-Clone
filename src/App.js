import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home/Home.js";
import FavList from "./components/FavList/FavList.js";
import Navigation from "./components/Navbar/Navbar.js";


function App() {
  return (
    <>
    <Navigation/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favMovieList" element={<FavList />}></Route>
      </Routes>
    </>
  );
}

export default App;






