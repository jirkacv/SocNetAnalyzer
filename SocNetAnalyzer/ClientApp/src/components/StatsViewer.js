import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StatisticsTable from './StatisticsTable';

export default class StatsViewer extends Component {

    closeDialog = () => {
        const { toggle } = this.props;
        toggle();
    }

    render() {
        const { isOpen, dataset, datasetStats } = this.props;

        return (
            <Modal isOpen={isOpen} toggle={this.closeDialog}>
                <ModalHeader >{dataset.name}</ModalHeader>
                <ModalBody>
                    <StatisticsTable datasetStats={datasetStats} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.closeDialog}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}