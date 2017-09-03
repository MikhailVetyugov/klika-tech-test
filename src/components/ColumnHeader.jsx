import React from 'react';

import {Constants} from '../consts';

class ColumnHeader extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onSort(this.props.property);
    }

    render() {
        const isSortedByThisColumn = this.props.sortBy && this.props.sortBy.property === this.props.property;

        let className = 'sort-icon';

        if (isSortedByThisColumn && this.props.sortBy.asc) {
            className += ' asc';
        } else if (isSortedByThisColumn) {
            className += ' desc';
        }

        return (
            <th>
                {Constants.propertyToTitle[this.props.property]}
                <div onClick={this.onClick} className={className}></div>
            </th>
        )
    }

}

export default ColumnHeader;