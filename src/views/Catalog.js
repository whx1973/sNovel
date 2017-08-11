import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as chapterActions from './ChapterListRedux';
import CatalogList from '../Components/BookChapter/CatalogList';

export class CatalogComponent extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        const bookId = this.props.params.bid;
        const pageId = 1;
        const pageSize = 100;
        const sort = 0;
        this.props.getChapterList(bookId, pageId, pageSize, sort);
    }

    render() {
        const { loaded } = this.props.chapterList.chapterListData;
        if (loaded) {
            return ( <
                CatalogList bookId = { this.props.params.bid } { ...this.props.chapterList.chapterListData }
                />
            )
        } else {
            return ( <
                div > loading < /div>
            );
        }

    }
}


const mapStateToProps = (state) => {
    const { chapterList } = state;
    return {
        chapterList
    }


}
const mapDispatchToProps = (dispatch, ownProps) => ({
    getChapterList: (bookId, pageId, pageSize, order) => {
        dispatch(chapterActions.actions.getChapterList(bookId, pageId, pageSize, order))
    }
})

const Catalog = connect(mapStateToProps, mapDispatchToProps)(CatalogComponent)

export default Catalog;