import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class NoEmail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="modal">
          <ModalHeader toggle={this.props.toggle}>Email form:  </ModalHeader>
          <ModalBody>
           Please enter your email in the form below
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default NoEmail;