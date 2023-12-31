import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            todosPerPage: 10,
            currentPage: 1,
        };
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(error => {
                console.log('Error fecting Todos: ' , error);
            });
    }

    handlePageClick = (page) => {
        // Update the currentPage state when a page is clicked
        this.setState({ currentPage: page });
    };

    render() {
        const numOfTotalPages = Math.ceil(this.state.todos.length / this.state.todosPerPage);
        const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

        const indexOfLastTodo = this.state.currentPage * this.state.todosPerPage;
        const indexOdFirstTodo = indexOfLastTodo - this.state.todosPerPage;

        const visibleTodos = this.state.todos.slice(indexOdFirstTodo, indexOfLastTodo);

        //const prevPageHandler = () => (
        //    if (this.state.currentPage !== 1) {
        //        this.setState({ currentPage: this.state.currentPage - 1 });
        //    }
        //);

        const prevPageHandler = () => {
            if (this.state.currentPage !== 1) {
                this.setState({ currentPage: this.state.currentPage - 1 });
            }
        };
        const nextPageHandler = () => {
            if (this.state.currentPage !== numOfTotalPages) {
                this.setState({ currentPage: this.state.currentPage + 1 });
            }
        };

        return (
            <div>
                <div>
                    <select onChange={(e) => this.setState({ todosPerPage: parseInt(e.target.value) })}>
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                    </select>

                    <Link to="/order">Go to Order Page</Link>

                    {/* Conditionally render todos data */}
                    {visibleTodos.length > 20 && (
                        <div>
                            {visibleTodos.map((todo) => (
                                <p key={todo.id}>{todo.title}</p>
                            ))}
                        </div>
                    )}

                    {/* Render your pagination controls here... */}
                </div>
                <Routes>
                    {AppRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </div>
        );
    }
    

}
