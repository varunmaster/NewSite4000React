import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MovieModal = ({ selectedMovie, open, close, movieObj }) => {
  //const [modal, setModal] = useState(false);
  //const toggle = () => setModal(!modal);
  const { Title, Plot, Year, Runtime, Released, Poster, imdbID } = selectedMovie;
  const fullName = Title + " (" + Year + ")";
  const link = "https://www.imdb.com/title/" + imdbID;

  return (
    <>
      {console.log("look here dummy:\n", selectedMovie, "\nopen is: ", open)}
      {<Modal isOpen={open} toggle={close}>
        <ModalHeader toggle={close}>
          <h2><b>{fullName}</b></h2>
          <small>Date added to Plex: {movieObj[fullName]}</small>
        </ModalHeader>
        <ModalBody>
          <div className="card bg-light mb-3">
            <div className="card-body">
              <h5 className="card-title">Plot:</h5>
              <p className="card-text">{Plot}</p>
            </div>
          </div>
          <hr />
          <div className="card bg-light mb-3">
            <div className="card-body">
              <h5 className="card-title">Runtime:</h5>
              <p className="card-text">{Runtime}</p>
            </div>
          </div>
          <hr />
          <div className="card bg-light mb-3">
            <div className="card-body">
              <h5 className="card-title">Released:</h5>
              <p className="card-text">{Released}</p>
            </div>
          </div>
          <hr />
          <div className="card bg-light mb-3">
            <div className="card-body">
              <p className="card-text text-center"><img src={Poster} alt='Poster'/></p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="info" href={link} target='_blank'>Open IMDB</Button>{' '}
          <Button color="danger" onClick={close}>Close</Button>{' '}
        </ModalFooter> }
      </Modal>}
    </>
  );
};

export default MovieModal;
