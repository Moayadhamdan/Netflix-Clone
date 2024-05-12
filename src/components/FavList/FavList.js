import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import "./FavList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";

function FavList() {
  useEffect(() => {
    sendReq();
  }, []);

  const [movies, setMovies] = useState([]);
  const [updatedComment, setUpdatedComment] = useState("");
  const [editableCommentId, setEditableCommentId] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState({});

  const sendReq = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(`${apiUrl}/getMovies`);
      const jsonRes = await res.json();
      setMovies(jsonRes);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleUpdate = async (id) => {
    const movieToUpdate = movies.find((movie) => movie.id === id);
    if (!movieToUpdate) return;

    const updatedMovie = { ...movieToUpdate, comment: updatedComment };

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(`${apiUrl}/updateMovie/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      });

      if (res.ok) {
        setMovies((prevMovies) =>
          prevMovies.map((m) => (m.id === id ? updatedMovie : m))
        );
        setEditableCommentId(null);
      } else {
        console.error("Failed to update movie");
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(`${apiUrl}/deleteMovie/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== id)
        );
      } else {
        console.error("Failed to delete movie");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const toggleOverview = (id) => {
    setShowFullOverview({
      ...showFullOverview,
      [id]: !showFullOverview[id],
    });
  };

  const renderOverview = (overview, id) => {
    if (showFullOverview[id]) {
      return overview;
    } else {
      const words = overview.split(" ");
      const firstSixWords = words.slice(0, 6).join(" ");
      return `${firstSixWords}...`;
    }
  };

  return (
    <>
      <h2 className="heading">Favorite Movies</h2>
      <div className="movie-container">
        <h1 className="movie-title">My Favorite Movies :</h1>

        <Row xs={1} md={2} lg={4}>
          {movies.map((movie) => (
            <Col key={movie.id} className="movie-col">
              <Card className="movie-card">
                <Card.Img
                  className="card-image"
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
                <Card.Body className="card-body">
                  <Card.Title className="card-title">
                    {movie.original_title}
                  </Card.Title>
                  <Card.Text className="card-text">
                    {renderOverview(movie.overview, movie.id)}
                    {!showFullOverview[movie.id] && (
                      <Button
                        variant="link"
                        onClick={() => toggleOverview(movie.id)}
                      >
                        <FontAwesomeIcon icon={faAngleDoubleDown} />
                        See More
                      </Button>
                    )}
                    {showFullOverview[movie.id] && (
                      <Button
                        variant="link"
                        onClick={() => toggleOverview(movie.id)}
                      >
                        <FontAwesomeIcon icon={faAngleDoubleUp} />
                        See Less
                      </Button>
                    )}
                  </Card.Text>
                  <div className="comment-box">
                    <p className="comment-text">Comment:</p>
                    {editableCommentId === movie.id ? (
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleUpdate(movie.id);
                        }}
                      >
                        <Form.Control
                          type="text"
                          value={updatedComment}
                          onChange={(e) => setUpdatedComment(e.target.value)}
                          className="comment-input"
                        />
                        <Button
                          variant="success"
                          type="submit"
                          className="update-button"
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditableCommentId(null)}
                          className="cancel-button"
                        >
                          Cancel
                        </Button>
                      </Form>
                    ) : (
                      <p className="comment-text">{movie.comment}</p>
                    )}
                  </div>
                  <ButtonGroup className="mr-2">
                    <Button
                      variant="success"
                      className="card-button"
                      onClick={() => setEditableCommentId(movie.id)}
                    >
                      Update Comment
                    </Button>
                    <Button
                      variant="primary"
                      className="card-button"
                      onClick={() => handleDelete(movie.id)}
                    >
                      Delete Movie
                    </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default FavList;
