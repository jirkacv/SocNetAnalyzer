import React, { Component } from 'react';
import { Table, Button, ButtonGroup } from 'reactstrap'
import NoteEditor from './DatasetEditor';
import { format } from 'date-fns'
import StatsViewerContainer from '../containers/StatsViewerContainer';


const DatasetStatus = {
    Created: 0,
    Imported: 1,
    Error: 2,
    Deleting: 3
}

const NotDeletableStatuses = [DatasetStatus.Created, DatasetStatus.Deleting];

export default class DatasetsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorOpened: false,
            statsOpened: false,
            currentDataset: {}
        }
    }

    componentDidMount = () => {
        const { loadDatasets } = this.props;
        loadDatasets();
    }

    closeEditor = () => {
        this.setState({
            editorOpened: false
        });
    }

    openEditor = () => {
        this.setState({
            editorOpened: true
        });
    }

    closeStats = () => {
        this.setState({            
            statsOpened: false
        });
    }

    openStats = datasetId => {
        const { datasets, loadDatasetStats } = this.props;
        loadDatasetStats(datasetId);

        this.setState({            
            statsOpened: true,
            currentDataset: datasets.get(datasetId),
        });
    }




    renderActions = dataset => {
        const { deleteDataset } = this.props;

        return (
            <ButtonGroup className="float-right">
                <Button
                    disabled={dataset.status !== DatasetStatus.Imported}
                    size="sm"
                    onClick={() => this.openStats(dataset.id)}>
                    Statistics
                </Button>
                <Button
                    disabled={NotDeletableStatuses.includes(dataset.status)}
                    size="sm"
                    color="danger"
                    onClick={() => deleteDataset(dataset.id)}>
                    Delete
                </Button>
            </ButtonGroup >);

    }

    formatDate = date => {
        if (!date) {
            return '';
        }

        return format(date, 'MM/DD/YYYY HH:mm');
    }

    renderStatus = status => {
        switch (status) {
            case DatasetStatus.Created: return 'Importing...';
            case DatasetStatus.Imported: return 'Ready';
            case DatasetStatus.Deleting: return 'Deleting...';
            default: return 'Error';
        }
    }

    renderRows = () => {
        const { datasets } = this.props;

        if (!datasets || (datasets && datasets.size === 0)) {
            return (
                <tr>
                    <td>There are no datasets at the moment</td>
                </tr>

            );
        }

        return Array.from(datasets.values()).map(d =>
            <tr className="d-flex" key={d.id}>
                <td className="col-6">{d.name}</td>
                <td className="col-2">{this.formatDate(d.dateCreated)}</td>
                <td className="col-2">{this.renderStatus(d.status)}</td>
                <td className="col-2">{this.renderActions(d)}</td>
            </tr>)
    }

    render() {
        const { editorOpened, currentDataset, statsOpened } = this.state;
        const { importDataset, loadDatasets } = this.props;

        return (
            <Table striped>
                <thead>
                    <tr className="d-flex">
                        <th className="col-6">Dataset</th>
                        <th className="col-2">Date created</th>
                        <th className="col-2">Status</th>
                        <th className="col-2">
                            <ButtonGroup className="float-right">
                                <Button
                                    size="sm"
                                    onClick={() => loadDatasets()}>
                                    Refresh
                                </Button>
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={this.openEditor}>
                                    Import dataset
                                </Button>
                            </ButtonGroup>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
                <NoteEditor
                    isOpen={editorOpened}
                    toggle={this.closeEditor}
                    createDataset={importDataset} />
                <StatsViewerContainer
                    isOpen={statsOpened}
                    toggle={this.closeStats}
                    dataset={currentDataset} />
            </Table>

        );
    }
}