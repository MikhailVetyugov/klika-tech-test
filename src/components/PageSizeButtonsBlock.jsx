import React from 'react';

import PageSizeButton from './PageSizeButton';
import {Constants} from '../consts';

class PageSizeButtonsBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let buttons = [];

        Constants.pageSizes.forEach((pageSize) => {
            buttons.push(
                <PageSizeButton
                    currentPageSize={this.props.currentPageSize}
                    pageSize={pageSize}
                    key={pageSize}
                    onChangePageSize={this.props.onChangePageSize}
                />);
        });

        return (
            <div className="page-size-buttons-block">
                {buttons}
            </div>
        )
    }

}

export default PageSizeButtonsBlock;