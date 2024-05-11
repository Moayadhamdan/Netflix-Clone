import Movie from '../Movie/Movie.js';
import Row from 'react-bootstrap/Row';
import './MovieList.css';

function MovieList(props) {
    return (
        <div className="container">
            <h1 className="movie-title">All Trending Movies :</h1>
            <Row xs={1} md={4} className="g-4">
                {props.trendingArr.map((movie) => (
                    <Movie 
                        key={movie.id} 
                        id={movie.id} 
                        title={movie.title || movie.name} 
                        image={movie.poster_path} 
                        overview={movie.overview} 
                        release_date={movie.release_date || movie.first_air_date} 
                        className="movie-card"
                    />
                ))}
            </Row>
        </div>
    );
}

export default MovieList;



