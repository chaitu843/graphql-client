import React, { Component } from 'react'

import {gql} from 'apollo-boost';
import { graphql } from 'react-apollo';

export const getBooksQuery = gql`
{
    books{
        id
        name
    }
}
`;

class BooksList extends Component {
    displaySingleBook = (book) => <li key={book.id}>{book.name}</li>;
    render() {
        return (
            <ul className = "books-list">
                {this.props.data.loading ? <li>Loading Books ... </li> : this.props.data.books.map(book => this.displaySingleBook(book))}
            </ul>
        )
    }
}

export default graphql(getBooksQuery)(BooksList);
