import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import MainPage from "../pages/MainPage";
import UserInfoPage from "../pages/UserInfoPage";
import BooksPage from "../pages/BooksPage";
import UsersPage from "../pages/UsersPage";
import BookInfoPage from "../pages/BookInfoPage";
import AddUserPage from "../pages/AddUserPage"
import AddBookPage from "../pages/AddBookPage";

const PageRouter = (user, setUser) => {

    return (
        <Switch>
            <Route path='/userInfo/:id_user'><UserInfoPage user={user}/></Route>
            <Route path='/books'><BooksPage user={user}/></Route>
            <Route path='/users'><UsersPage user={user}/></Route>
            <Route path='/bookInfo/:id_user/:id_book'><BookInfoPage user={user}/></Route>
            <Route path='/addUser/:id_user'><AddUserPage user={user}/></Route>
            <Route path='/addBook/:id_user/:id_book'><AddBookPage user={user}/></Route>
            <Redirect to="/main"/>
        </Switch>
    );
};

export default PageRouter;