import React from 'react';

import PageNumberButton from './PageNumberButton';
import {Constants} from '../consts'
import Resources from '../../resources.json';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.onNavigation = this.onNavigation.bind(this);
    }

    onNavigation(pageNumber) {
        this.props.onNavigation(pageNumber);
    }

    render() {
        if (this.props.pagesCount < 2) {
            return null;
        }

        const buttonsCount = Math.min(this.props.pagesCount, Constants.pageButtonsCount);
        let buttons = [];
        let pageNumber;

        var halfButtonsCount = Math.floor(buttonsCount / 2);

        // The navigation behaves like WordPress pagination.
        if (this.props.currentPageNumber <= halfButtonsCount) {
            pageNumber = 1;
        } else if (this.props.pagesCount - this.props.currentPageNumber <= halfButtonsCount) {
            pageNumber = this.props.pagesCount - buttonsCount + 1;
        } else {
            pageNumber = this.props.currentPageNumber - halfButtonsCount;
        }

        for (let i = 0; i < buttonsCount; i++, pageNumber++) {
            buttons.push(
                <PageNumberButton
                    currentPageNumber={this.props.currentPageNumber}
                    pageNumber={pageNumber}
                    key={pageNumber}
                    onClick={this.onNavigation}
                />);
        }

        var countOfPagesLabel = buttons.length != this.props.pagesCount
            ? <div className="pages-count">{this.props.pagesCount} {Resources.pages}</div>
            : null;

        // TODO: Move the previous and next buttons to the separate components. Move the arrows to CSS.
        return (
            <div className="navigation">
                <div className="page-number-button arrow to-start">
                    <a onClick={() => this.onNavigation(1)}>&#x25c0;</a>
                </div>

                <div className="page-number-button arrow">
                    <a onClick={() => this.onNavigation(this.props.currentPageNumber - 1)}>&lt;</a>
                </div>

                {buttons}

                <div className="page-number-button arrow">
                    <a onClick={() => this.onNavigation(this.props.currentPageNumber + 1)}>&gt;</a>
                </div>

                <div className="page-number-button arrow to-end">
                    <a onClick={() => this.onNavigation(this.props.pagesCount)}>&#x25ba;</a>
                </div>

                {countOfPagesLabel}
            </div>
        )
    }
}

export default Navigation;