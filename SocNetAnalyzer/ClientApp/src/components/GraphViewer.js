import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ConnectionGraph from './ConnectionGraph';

export default class GraphViewer extends Component {

    closeDialog = () => {
        const { toggle } = this.props;
        toggle();
    }

    render() {
        const { isOpen, dataset, datasetConnections } = this.props;

        return (
            <Modal isOpen={isOpen} toggle={this.closeDialog} size="lg">
                <ModalHeader >{dataset.name}</ModalHeader>
                <ModalBody style={{padding: 0}}>
                    <ConnectionGraph datasetConnections={isOpen ? datasetConnections : {}} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.closeDialog}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}