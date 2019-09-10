import React, { Component } from 'react'

import {gql} from 'apollo-boost';
import { graphql } from 'react-apollo';

import BookDetail from '../BookDetail/BookDetail';
import './BooksList.css';

export const getBooksQuery = gql`
{
    books{
        id
        name
    }
}
`;

class BooksList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             selected: 0
        }
    }
    
    clickHandler = (e) => {
        this.setState({
            selected: e.target.id
        })
    }

    displaySingleBook = (book) => <li key={book.id} id={book.id} onClick = {this.clickHandler}>{book.name}</li>;

    render() {
        return (
            <div>
            <ul className = "books-list">
                {this.props.data.loading ? <li>Loading Books ... </li> : this.props.data.books.map(book => this.displaySingleBook(book))}
            </ul>
            <div className='detail'><BookDetail bookId = {this.state.selected} /></div>
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BooksList);
