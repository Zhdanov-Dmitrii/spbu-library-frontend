import React, {useEffect} from 'react';
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import {currentUser} from "../Constants/currentUserInfo";
import UserInfo from "../component/UI/UserInfo";
import TableBookUser from "../component/UI/TableBookUser";


const UserInfoPage = () => {

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <UserInfo
                        user={currentUser}
                    />
                </Col>
                <Col>
                    <h1>Книги пользователя</h1>
                    <TableBookUser
                    user={currentUser}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default UserInfoPage;