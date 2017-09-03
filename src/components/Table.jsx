import React from 'react';

import Row from './Row';
import Navigation from './Navigation';
import PageSizeButtonsBlock from './PageSizeButtonsBlock';
import ColumnHeader from './ColumnHeader';

import Resources from '../../resources.json';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let rows = [];

        this.props.tracks.forEach((track) => {
            rows.push(<Row track={track} key={track.id}/>);
        });

        return (
            <div className="playlist-table">
                <div className="playlist-table-header">{Resources.playlist}</div>

                <table>
                    <thead>
                    <tr>
                        <ColumnHeader property="performer" sortBy={this.props.sortBy} onSort={this.props.onSort}/>
                        <ColumnHeader property="title" sortBy={this.props.sortBy} onSort={this.props.onSort}/>
                        <ColumnHeader property="genre" sortBy={this.props.sortBy} onSort={this.props.onSort}/>
                        <ColumnHeader property="year" sortBy={this.props.sortBy} onSort={this.props.onSort}/>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>

                <PageSizeButtonsBlock
                    onChangePageSize={this.props.onChangePageSize}
                    currentPageSize={this.props.currentPageSize}/>
                <Navigation
                    onNavigation={this.props.onNavigation}
                    pagesCount={this.props.pagesCount}
                    currentPageNumber={this.props.currentPageNumber}/>
            </div>
        )
    }
}

export default Table;