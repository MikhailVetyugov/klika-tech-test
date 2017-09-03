import React from 'react';

import FilterDropdown from './FilterDropdown';
import Resources from '../../resources.json';

class Filter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let dropdowns = [];

        this.props.criterias.forEach((criteria) => {
            dropdowns.push(
                <FilterDropdown filterBy={this.props.filterBy}
                                criteria={criteria}
                                key={criteria.property}
                                onFilterSelection={this.props.onFilterSelection}
                />);
        });

        return (
            <div className="filter">
                <div className="filter-header">{Resources.filter}</div>
                <div className="filter-body">{dropdowns}</div>
            </div>
        )
    }
}

export default Filter;