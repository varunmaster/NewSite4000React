import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MovieModal = ({ selectedShow, open, close, showObj }) => {
  //const [modal, setModal] = useState(false);
  //const toggle = () => setModal(!modal);
  const { Title, Plot, Genre, Released, Poster, imdbID, Actors, Ratings, totalSeasons } = selectedShow;
  const link = "https://www.imdb.com/title/" + imdbID;

  return (
    <>
      {/* {console.log("look here dummy:\n", selectedMovie, "\nopen is: ", open)} */}
      {<Modal isOpen={open} toggle={close} className="modal-dialog modal-dialog-centered modal-lg">
        <ModalHeader toggle={close} className="bg-dark">
          <h2><b>{Title}</b></h2>
          <small>Date added to Plex: {showObj[Title]}</small>
        </ModalHeader>
        <ModalBody className="bg-dark">
          <div className="row">
            <div className="col-sm-3">
              <img src={Poster} alt='Poster' width="250px" />
            </div>
            <div className='col-sm-1'></div>
            <div className="col-sm-4">
              <div className="card border-light bg-dark mb-3">
                <div className="card-body">
                  <h5 className="card-title">Plot:</h5>
                  <p className="card-text">{Plot}</p>
                </div>
              </div>
              <hr />
              <div className="card border-light bg-dark mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Seasons:</h5>
                  <p className="card-text">{totalSeasons}</p>
                </div>
              </div>
              <hr />
              <div className="card border-light bg-dark mb-3">
                <div className="card-body">
                  <h5 className="card-title">Released:</h5>
                  <p className="card-text">{Released}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div>
              <div className="card border-light bg-dark mb-3">
                <div className="card-body">
                  <h5 className="card-title">Ratings:</h5>
                  <ul>{Ratings.map(rating => {
                    return <li key={Ratings.indexOf(rating)}>{rating.Source}: {rating.Value}</li>
                  })}</ul>
                </div>
              </div>
              <hr />
              <div className="card border-light bg-dark mb-3">
                <div className="card-body">
                  <h5 className="card-title">Cast:</h5>
                  <ul>{Actors.split(",").map(actor => {
                    return <li key={actor}>{actor}</li> 
                  })}</ul>
                </div>
              </div>
              <hr />
              <div className="card border-light bg-dark mb-3">
                <div className="card-body">
                  <h5 className="card-title">Genre:</h5>
                  <ul>{Genre}</ul>
                </div>
              </div>
              </div>
            </div>

            {/* <hr /> */}
          </div>
        </ModalBody>
        <ModalFooter className="bg-dark">
          <Button color="info" href={link} target='_blank'>Open IMDB</Button>{' '}
          <Button color="danger" onClick={close}>Close</Button>{' '}
        </ModalFooter> 
      </Modal>}
    </>
  );
};

export default MovieModal;
