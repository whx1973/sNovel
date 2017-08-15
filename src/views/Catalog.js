import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as chapterActions from './ChapterListRedux';
import CatalogList from '../Components/BookChapter/CatalogList';

import GetData from './GetData';

export class CatalogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {pageId:1}
        this.getPrevPage = this.getPrevPage.bind(this);  
        this.getNextPage = this.getNextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }
    componentDidMount() {
        const bookId = this.props.params.bid; 
        const pageSize = 100;
        const sort = 0;
        this.props.getChapterList(bookId, this.state.pageId, pageSize, sort);
        this.setState(this.nextPage)
    }
    //同步更新键为pageId的state
    prevPage(state,props){
        return {pageId:state.pageId - 1};
    }
     //同步更新键为pageId的state
    nextPage(state,props){
        return {pageId:state.pageId + 1};
    }
    getPrevPage(){ 
        const bookId = this.props.params.bid; 
        const count = this.props.chapterList&&this.props.chapterList.count; 
        const pageSize = 100;
        const sort = 0; 
        if(this.state.pageId!=1 ){
           
            this.props.getChapterList(bookId, this.state.pageId, pageSize, sort);
            this.setState(this.prevPage)
        }
    }
    getNextPage(){  
        const bookId = this.props.params.bid; 
        const count = this.props.chapterList&&this.props.chapterList.count; 
        const pageSize = 100;
        const sort = 0;  
        if(Math.ceil(count / pageSize) > this.state.pageId ){
            this.props.getChapterList(bookId, this.state.pageId, pageSize, sort);
            this.setState(this.nextPage)
        } 
    }
    render() {
        const { loaded } = this.props.chapterList;
        if (loaded) {
            return ( <CatalogList bookId = { this.props.params.bid } { ...this.props.chapterList }  />
            )
        } else {
            return null;
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

const Catalog = connect(mapStateToProps, mapDispatchToProps)(GetData(CatalogComponent,'chapterList'))

export default Catalog;