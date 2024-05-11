import React, { useState } from 'react';
import ModalMovie from '../ModalMovie/ModalMovie.js';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './Movie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

function Movie(props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [comment, setComment] = useState('');
    const [showFullOverview, setShowFullOverview] = useState({});

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedMovie(null);
        setComment('');
    };

    const handleAddToFavorites = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const toggleOverview = (id) => {
        setShowFullOverview({
            ...showFullOverview,
            [id]: !showFullOverview[id]
        });
    };

    const renderOverview = (id) => {
        if (showFullOverview[id]) {
            return props.overview;
        } else {
            const words = props.overview.split(' ');
            const firstSixWords = words.slice(0, 6).join(' ');
            return `${firstSixWords}...`;
        }
    };

    return (
        <>
            <Col key={props.id} className="movie-col">
                <Card className="movie-card">
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${props.image}`} className="card-image" />
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Text className="card-text">
                            {renderOverview(props.id)}
                            {!showFullOverview[props.id] && (
                                <Button variant="link" onClick={() => toggleOverview(props.id)}>
                                    <FontAwesomeIcon icon={faAngleDoubleDown} /> See More
                                </Button>
                            )}
                            {showFullOverview[props.id] && (
                                <Button variant="link" onClick={() => toggleOverview(props.id)}>
                                    <FontAwesomeIcon icon={faAngleDoubleUp} /> See Less
                                </Button>
                            )}
                        </Card.Text>
                        <Button variant="primary" onClick={() => handleAddToFavorites(props)}>Add to Favorites</Button>
                    </Card.Body>
                </Card>
            </Col>
            <ModalMovie
                showModal={showModal}
                handleModalClose={handleModalClose}
                selectedMovie={selectedMovie}
                comment={comment}
                setComment={setComment}
            />
        </>
    );
}

export default Movie;
