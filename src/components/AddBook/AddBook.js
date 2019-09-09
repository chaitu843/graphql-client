import React, { Component } from 'react'
import { gql } from 'apollo-boost';
import { graphql, } from 'react-apollo';

import { flowRight as compose } from 'lodash';

import {getBooksQuery} from '../BooksList/BooksList';
const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`
const addBookMutation = gql`
    mutation($id: ID!, $name: String!, $genre: String!, $authorId: String!) {
        addBook(id: $id, name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`
class AddBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            genre: '',
            authorId: 'selectAuthor'
        }
    }

    clickHandler = (e) => {
        this.props.addBook({
            variables: {
                id: this.state.id,
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery}]
        })

        this.setState({
            id: '',
            name: '',
            genre: '',
            authorId: 'selectAuthor'
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    displayAuthors = (authors) => authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>);

    render() {
        return (
            <form className="add-book">
                <div className="field">
                    <label htmlFor="bookId">Enter ID of the Book: </label>
                    <input type="text" name="id" value={this.state.id} onChange = {this.changeHandler} />
                </div>

                <div className="field">
                    <label htmlFor="bookName">Enter Name of the Book: </label>
                    <input type="text" name="name" value={this.state.name} onChange={this.changeHandler} />
                </div>

                <div className="field">
                    <label htmlFor="bookGenre">Enter Genre of the Book: </label>
                    <input type="text" name="genre" value={this.state.genre} onChange={this.changeHandler} />
                </div>

                <div>
                    <label>Select Author of the book: </label>
                    <select value = {this.state.authorId} onChange={(e) => this.setState({
                        authorId: e.target.value
                    })}>
                        <option value="selectAuthor">Select Author</option>
                        {this.props.getAuthors.loading ? <option>Loading...</option> : this.displayAuthors(this.props.getAuthors.authors)}
                    </select>
                </div>
                <input type="button" value="Add Book" onClick = {this.clickHandler}/>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthors' }),
    graphql(addBookMutation, { name: 'addBook' }),
)(AddBook)
