import React, {useEffect} from 'react';
import {Button, Card} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {setRule} from "../../API/postRequest";

const UserInfo = ({currentUser, user}) => {
    const router = useHistory();
    useEffect(()=>{
        console.log(user)
        console.log(currentUser)
    },[])
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={currentUser.imageUrl} />
            <Card.Body>
                <Card.Title>{currentUser.fio}</Card.Title>
                <Card.Text>({currentUser.rule})</Card.Text>
                <Card.Text>email: {currentUser.email}</Card.Text>
                <Card.Text>Любимые жанры: {currentUser.genre}</Card.Text>
                <div className='mt-3'>
                    {
                        (!!user && (user.user.user.id_user === currentUser.id_user || user.user.user.id_rule === 2)) ?
                            <Button variant={"primary"}
                                    onClick={()=>{
                                        router.push('/addUser/'+currentUser.id_user)}}>
                                >Изменить данные</Button>
                            : null
                    }
                </div>
                <div className='mt-3'>
                    {
                        (!!user && (user.user.user.id_user === currentUser.id_user || user.user.user.id_rule === 2)) ?
                            <Button variant={"primary"}
                                    onClick={()=>{
                                        router.push('/addBook/'+currentUser.id_user+'/-1')}}>
                                Добавить книгу</Button>
                            : null
                    }
                </div>
                <div className="mt-3">
                    {
                        (!!user && user.user.user.id_rule === 2 && currentUser.id_rule === 1) ?
                            <Button variant={"primary"}
                                    onClick={()=>{
                                        setRule(currentUser,2)}}>
                                Назначить администратором
                            </Button> : null
                    }
                    {
                        (!!user && user.user.user.id_rule === 2 && currentUser.id_rule === 2) ?
                            <Button variant={"primary"}
                                    onClick={()=>{
                                        setRule(currentUser,1)}}>
                                Снять администратора
                            </Button> : null
                    }
                </div>
            </Card.Body>
        </Card>
    );
};

export default UserInfo;