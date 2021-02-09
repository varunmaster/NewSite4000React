import React, { useState } from 'react';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MovieModal = ({ movieObj }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
    {console.log("look here dummy:\n", movieObj)}
      {/* <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{movieObj.Name}</ModalHeader>
        <ModalBody>
          {movieObj.Plot}
        </ModalBody> */}


        {/* this will be links to imDB website
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
        </ModalFooter> 
      </Modal>*/}
    </>
  );
};

export default MovieModal;
