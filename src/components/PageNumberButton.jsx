import React from 'react';

class PageNumberButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.props.pageNumber);
    }

    render() {
        const className = this.props.pageNumber === this.props.currentPageNumber
            ? 'selected'
            : '';

        return (
            <div className="button page-number-button">
                <a onClick={this.onClick} className={className}>{this.props.pageNumber}</a>
            </div>
        )
    }
}

export default PageNumberButton;