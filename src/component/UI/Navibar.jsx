import React from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {useHistory} from "react-router-dom";
import {currentUser} from "../../Constants/currentUserInfo";
import {login} from "../../API/getRequest";

const clientId = "943068152828-cau7auhon1lj00q6cn8v80nkto9gvq7p.apps.googleusercontent.com";

const Navibar = ({user, setUser}) => {

    const router = useHistory();

    const onLoginSuccess = async (res) => {
        await login(res.profileObj,setUser);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        setUser({googleId:undefined})
    };

    const getLoginCallback = (userInfo)=>{
        console.log(userInfo)
        setUser(userInfo)
    }

    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand onClick={()=>router.push('/main')}>Книжная паутина</Navbar.Brand>
            <Navbar.Toggle aria-controls={"responsive-navbar-nav"}/>
            <Navbar.Collapse id={"responsive-navbar-nav"}>
                <Nav className={"mr-auto"}>
                    <Button variant={"primary"} className={"mr-2"} onClick={()=>router.push('/users')}>Читатели</Button>
                </Nav>
                <Nav className={"mr-auto"}>
                    <Button variant={"primary"} className={"mr-2"}onClick={()=>router.push('/books')}>Книги</Button>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Brand>
                {
                    !user.googleId ? null
                        :<Button variant={"primary"}
                                 onClick={()=>{
                                     currentUser.fio =user.fio;
                                     currentUser.id_user= user.id_user;
                                     currentUser.email = user.email;
                                     currentUser.imageUrl = user.imageUrl;
                                     currentUser.genre = user.genre;
                                     currentUser.googleId = user.googleId;
                                     console.log(currentUser);
                                     router.push('/userInfo')}}>
                            Личный кабинет
                         </Button>
                }
            </Navbar.Brand>
            <Navbar.Brand>
                {
                    !user.googleId ?
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign In"
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
                        :
                        <GoogleLogout
                            clientId={clientId}
                            buttonText="Sign Out"
                            onLogoutSuccess={onSignoutSuccess}
                        />
                }
            </Navbar.Brand>

        </Navbar>
    )

}

export default Navibar;