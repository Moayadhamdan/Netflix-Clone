import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './ModalMovie.css';

function ModalMovie({ showModal, handleModalClose, selectedMovie, comment, setComment }) {

    const handleSaveToFavorites = async () => {
        try {
            await axios.post('http://localhost:3000/addMovie', {
                original_title: selectedMovie.title,
                release_date: selectedMovie.release_date,
                poster_path: selectedMovie.image,
                overview: selectedMovie.overview,
                comment: comment
            });
            handleModalClose();
        } catch (error) {
            console.error('Error saving movie to favorites:', error);
        }
    };

    return (
        <Modal show={showModal} onHide={handleModalClose} className="modal-container">
            <Modal.Header closeButton>
                <Modal.Title>Add to Favorites</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>{selectedMovie && selectedMovie.title}</h5>
                {selectedMovie && <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.image}`} alt={selectedMovie.title} className="modal-image" />}
                <textarea
                    className="form-control mt-3"
                    rows="3"
                    placeholder="Add your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                <Button variant="primary" onClick={handleSaveToFavorites}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalMovie;