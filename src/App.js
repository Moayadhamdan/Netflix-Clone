import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home/Home.js";
import MovieList from "./components/MovieList/MovieList.js";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favMovieList" element={<MovieList />}></Route>
      </Routes>
    </>
  );
}

export default App;