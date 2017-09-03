import React from 'react';

import Table from './Table';
import Filter from './Filter';
import TrackService from '../tracks-service';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortBy: {
                property: 'performer',
                asc: true
            },
            filterBy: {},
            currentPageNumber: 1,
            currentPageSize: 10,
            tracks: [],
            pagesCount: 0,
            valuesForFilter: []
        };

        this.trackService = new TrackService();

        this.onNavigation = this.onNavigation.bind(this);
        this.onChangePageSize = this.onChangePageSize.bind(this);
        this.onSort = this.onSort.bind(this);
        this.onFilterSelection = this.onFilterSelection.bind(this);
    }

    onNavigation(pageNumber) {
        if (pageNumber < 1
            || pageNumber > this.state.pagesCount
            || pageNumber === this.state.currentPageNumber) {
            return;
        }

        this.setState({
            currentPageNumber: pageNumber
        }, this.getTracksByCondition);
    }

    onChangePageSize(pageSize) {
        if (pageSize === this.state.currentPageSize) {
            return;
        }

        this.setState({
            currentPageSize: pageSize,
            currentPageNumber: 1
        }, this.getTracksByCondition);
    }

    onSort(property) {
        const asc = this.state.sortBy.property !== property
            ? true
            : !this.state.sortBy.asc;

        this.setState({
            sortBy: {
                property: property,
                asc: asc
            },
            currentPageNumber: 1
        }, this.getTracksByCondition);
    }

    onFilterSelection(property, value) {
        let filterBy = Object.assign({}, this.state.filterBy, {[property]: value || undefined});

        this.setState({
            filterBy: filterBy,
            currentPageNumber: 1
        }, this.getTracksByCondition);
    }

    getTracksByCondition() {
        let condition = {
            sortBy: this.state.sortBy,
            filterBy: this.state.filterBy,
            currentPageSize: this.state.currentPageSize,
            currentPageNumber: this.state.currentPageNumber
        };

        this.trackService.getTracksByCondition(condition, (tracks, pagesCount) => {
            this.setState({tracks, pagesCount});
        });
    }

    componentDidMount() {
        this.trackService.getValuesForFilter((valuesForFilter) => {
            this.setState({valuesForFilter});
        });

        this.getTracksByCondition();
    }

    render() {
        return (
            <div className="app-container">
                <Table tracks={this.state.tracks}
                       pagesCount={this.state.pagesCount}
                       currentPageNumber={this.state.currentPageNumber}
                       currentPageSize={this.state.currentPageSize}
                       sortBy={this.state.sortBy}
                       onNavigation={this.onNavigation}
                       onSort={this.onSort}
                       onChangePageSize={this.onChangePageSize}/>
                <Filter criterias={this.state.valuesForFilter}
                        filterBy={this.state.filterBy}
                        onFilterSelection={this.onFilterSelection}/>
            </div>
        );
    }
}

export default App;