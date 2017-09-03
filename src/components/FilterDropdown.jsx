import React from 'react';

import {Constants} from '../consts';
import Resources from '../../resources.json';

class FilterDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.onFilterSelection(this.props.criteria.property, event.target.value);
    }

    render() {
        let options = [];

        var values = this.props.criteria.values;
        values.sort();

        values.forEach((value) => {
            options.push(<option key={value}>{value}</option>);
        });

        const currentSelectValue = this.props.filterBy[this.props.criteria.property];

        return (
            <div className="filter-dropdown">
                <div className="filter-dropdown-label">
                    {Constants.propertyToTitle[this.props.criteria.property]}
                </div>
                <select value={currentSelectValue} onChange={this.onChange}>
                    <option value="">{Resources.all}</option>
                    {options}
                </select>
            </div>
        )
    }
}

export default FilterDropdown;