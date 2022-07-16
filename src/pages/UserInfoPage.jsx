import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import UserInfo from "../component/UI/UserInfo";
import TableBookUser from "../component/UI/TableBookUser";
import {getUser} from "../API/getRequest";
import {useParams} from "react-router-dom";
import TableBookAuthor from "../component/UI/TableBookAuthor";


const UserInfoPage = (user) => {

    const {id_user} = useParams()
    const [currentUser, setCurrentUser] = useState({
        id_user: id_user,
        fio: undefined,
        genre: undefined,
        email: undefined,
        imageUrl:undefined,
        rule:undefined,

    })

    useEffect(()=>{
        getData()
    },[])

    async function getData(){
        console.log(id_user)
        await getUser(id_user, setCurrentUser)
    }

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <UserInfo
                        currentUser={currentUser}
                        user = {user}
                    />
                </Col>
                <Col>
                    <h1>Книги пользователя</h1>
                    <TableBookAuthor
                        id_user={id_user}
                    />
                    <h1>Отзывы пользователя</h1>
                    <TableBookUser
                        id_user={id_user}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default UserInfoPage;