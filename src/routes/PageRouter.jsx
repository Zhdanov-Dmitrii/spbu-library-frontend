import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import MainPage from "../pages/MainPage";
import UserInfoPage from "../pages/UserInfoPage";
import BooksPage from "../pages/BooksPage";
import UsersPage from "../pages/UsersPage";

const PageRouter = (user, setUser) => {

    return (
        <Switch>
            <Route path='/main'><MainPage user={user} setUser={setUser}/></Route>
            <Route path='/userInfo'><UserInfoPage user={user}/></Route>
            <Route path='/books'><BooksPage user={user}/></Route>
            <Route path='/users'><UsersPage user={user}/></Route>
            <Redirect to="/main"/>
        </Switch>
    );
};

export default PageRouter;