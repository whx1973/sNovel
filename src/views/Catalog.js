import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link,hashHistory } from 'react-router';
import * as chapterActions from './ChapterListRedux';
import CatalogList from '../Components/BookChapter/CatalogList'; 
import GetData from '../components/GetData';
import SubHeader from '../layouts/SubHeader';
import Footer from '../layouts/Footer';
import styles from '../layouts/base.css';

export class CatalogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {pageId:1}
        this.getPrevPage = this.getPrevPage.bind(this);  
        this.getNextPage = this.getNextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.onBack = this.onBack.bind(this);
    }
    onBack(){
        const bookId = this.props.params.bid;
        hashHistory.push(`/book/${bookId}`);
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
    componentDidUpdate(){ 
        this.props.registerEvent();
    }
    render() {
        const { loaded } = this.props.chapterList;
        if (loaded) {
            return (
                <div>
                    <SubHeader title ='目录' onBack = {this.onBack}> 
                        <Link className={styles.a_reset} to={"/"}>首页</Link>
                    </SubHeader>
                    <CatalogList bookId = { this.props.params.bid } { ...this.props.chapterList }  />
                    <Footer />
                </div> 
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