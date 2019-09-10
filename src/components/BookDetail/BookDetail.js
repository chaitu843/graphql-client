import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import { graphql } from 'react-apollo';
import './BookDetail.css';

const getBookQuery = gql`
query($id: ID!){
    book(id: $id){
        name
        genre
        author{
            books{
                id
                name
            }
        }
    }
}
`;

class BookDetail extends Component {
    render() {
        const {book} = this.props.data;
       if(book)  return (
        <div className = "book-details">
            <h2> Book Details </h2>
            <h3> {book.name} </h3>
            <p> {book.genre} </p>
            <p> All other books by this author</p>
            <ul>
                {book.author.books.map(book => <li key={book.id}>{book.name}</li>)}
            </ul>
        </div>
    )
    else return <div className = "book-details" style={{
        textAlign: 'center'
    }}>No Books Selected !</div>;
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetail);
