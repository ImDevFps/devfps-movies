import React, { useState } from "react";
import { selectMovie } from "../../redux/movies/movies.selector";
import { connect } from "react-redux";
import { firestore } from "../../firebase/firebase.utils";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./style.scss";

const AdminMovieEdit = ({ movie }) => {
  const [title, setTitle] = useState(movie.title);
  const [poster, setPoster] = useState(movie.poster);
  const [trailer, setTrailer] = useState(movie.trailer);
  const [subtitle, setSubtitle] = useState("");
  const [src_1, setSrc1] = useState(movie.src_1);
  const [src_2, setSrc2] = useState(movie.src_2);

  //success alert
  const [snack, setSnack] = useState(false);

  const updateHandler = async () => {
    const db = firestore;
    await db
      .collection("movies")
      .doc(movie.id)
      .set({
        ...movie,
        title,
        poster,
        trailer,
        subtitle,
        src_1,
        src_2,
      });
    setSnack(true);
  };
  const deleteHandler = () => {
    const db = firestore;
    db.collection("movies").doc(movie.id).delete();
    setSnack(true);
  };
  return (
    <div className='container'>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={snack}
          autoHideDuration={6000}
          onClose={() => setSnack(false)}>
          <Alert
            onClose={() => setSnack(false)}
            severity='success'
            sx={{ width: "100%" }}>
            This is a success message!
          </Alert>
        </Snackbar>
      </Stack>
      <div className='edit-list'>
        <ul>
          <li>
            <input
              type='text'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span>movie title</span>
          </li>
          <li>
            <input
              type='text'
              name='subtitle'
              value={subtitle}
              placeholder='subtitle'
              onChange={(e) => setSubtitle(e.target.value)}
            />
            <span>movie subtitle</span>
          </li>
          <li>
            <input
              type='text'
              name='poster'
              value={poster}
              placeholder='poster'
              onChange={(e) => setPoster(e.target.value)}
            />
            <span>movie poster</span>
          </li>
          <li>
            <input
              type='text'
              name='trailer'
              value={trailer}
              placeholder='trailer'
              onChange={(e) => setTrailer(e.target.value)}
            />
            <span>movie trailer</span>
          </li>
          <li>
            <input
              type='text'
              name='src_1'
              value={src_1}
              placeholder='src_1'
              onChange={(e) => setSrc1(e.target.value)}
            />
            <span>movie 720p</span>
          </li>
          <li>
            <input
              type='text'
              name='src_2'
              value={src_2}
              placeholder='src_2'
              onChange={(e) => setSrc2(e.target.value)}
            />
            <span>movie 1080p</span>
          </li>
        </ul>
        <div className='handler-buttons'>
          <button onClick={updateHandler}>Update</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  movie: selectMovie(ownProps.match.params.movieId)(state),
});

export default connect(mapStateToProps)(AdminMovieEdit);
