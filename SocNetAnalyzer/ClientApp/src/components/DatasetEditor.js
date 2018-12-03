import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

export default class DatasetEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            file: undefined,
        }
    }

    handleTextChange = e => this.setState({ name: e.target.value });

    handleFileChange = e => this.setState({ file: e.target.files[0] });

    closeDialog = () => {
        const { toggle } = this.props;
        this.setState({ name: '', file: undefined });
        toggle();
    }

    handleSave = () => {
        const { createDataset } = this.props;
        const { name, file } = this.state;

        createDataset(name, file);

        this.closeDialog();
    }

    render() {
        const { isOpen } = this.props
        const { name, file } = this.state;

        return (
            <Modal isOpen={isOpen} toggle={this.closeDialog}>
                <ModalHeader>Create new dataset</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="datasetName">Dataset name</Label>
                            <Input type="text" name="datasetName" id="datasetName" value={name} onChange={this.handleTextChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="datasetFile">File</Label>
                            <Input type="file" name="datasetFile" id="datasetFile" onChange={this.handleFileChange} />
                        </FormGroup>
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={name.trim() === '' || file === undefined} onClick={this.handleSave}>Save</Button>
                    <Button color="secondary" onClick={this.closeDialog}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}