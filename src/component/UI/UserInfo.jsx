import React, {useEffect} from 'react';
import {Card} from "react-bootstrap";

const UserInfo = ({user}) => {
    useEffect(()=>{
        console.log(user)
    },[])
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user.imageUrl} />
            <Card.Body>
                <Card.Title>{user.fio}</Card.Title>
                <Card.Text>email: {user.email}</Card.Text>
                <Card.Text>Любимые жанры: {user.genre}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default UserInfo;