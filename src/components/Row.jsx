import React from 'react';

class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.track.performer}</td>
                <td>{this.props.track.title}</td>
                <td>{this.props.track.genre}</td>
                <td>{this.props.track.year}</td>
            </tr>
        );
    }
}

export default Row;