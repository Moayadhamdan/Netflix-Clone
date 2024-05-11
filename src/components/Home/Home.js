import React, { useEffect, useState } from "react";
import MovieList from '../../components/MovieList/MovieList.js';
import './Home.css';

function Home() {
  const [trendingArr, setTrendingArr] = useState([]);

  const sendReq = async () => {
    const serverURL = `https://api.themoviedb.org/3/trending/all/week?api_key=8f8ff63d375ef9af382e04b6c6837080`;
    const res = await fetch(serverURL);
    const jsonRes = await res.json();
    setTrendingArr(jsonRes.results);
  }

  useEffect(() => {
    sendReq();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Hamdan Movies</h1>
      <MovieList trendingArr={trendingArr} />
    </div>
  );
}

export default Home;