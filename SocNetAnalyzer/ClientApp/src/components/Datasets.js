import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import DatasetsListContainer from '../containers/DatasetsListContainer';

export default class Notes extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <DatasetsListContainer />
                </Row>
            </Container>);
    }
}