import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row, Form, Button} from "react-bootstrap";
import {getBook, getRead, getReadUsers, getUser, login} from "../API/getRequest";
import Rating from "react-rating";
import Pagination from "../component/UI/Pagination";
import {useHistory, useParams} from "react-router-dom";


const BookInfoPage = (user) => {
    const router = useHistory();

    const {id_user, id_book} = useParams()

    const [currentUser, setCurrentUser] = useState({})
    const [currentBook, setCurrentBook] = useState({})

    const [currentPage, setCurrentPage] = useState(1)
    const [countRecord, setCountRecord] = useState(0)
    const [rating, setRating] = useState(0);
    const [users, setUsers] = useState([{
        id_user: undefined,
        fio: undefined,
        rate: undefined,
        comment: undefined
    }]);
    const [params, setParams] = useState({
        id_book: id_book,
        id_user: id_user,
        status: 1,
        rate: undefined,
        comment: undefined
    })

    async function getData(){
        console.log(id_user)
        await getUser(id_user, setCurrentUser)
        await getBook(id_book, setCurrentBook)
    }

    useEffect(() => {
        changePage(1)
        getData()
    },[])

    const onSearchClick = async (e) =>{

        e.preventDefault();
        console.log(params)
        await getRead(params, getCallback);
        await changePage(1)
    }

    const getCallback = (res) => {
        console.log(res)
    }

    async function changePage (page){
        setCurrentPage(page)
        console.log(user.user)
        await getReadUsers(id_book,(page-1), getReadUserCallback);
    }

    const getReadUserCallback = (count, users) => {
        setCountRecord(count)
        setUsers(users)
    }

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{currentBook.name}</Card.Title>
                            <Card.Text>Автор: {"".concat(currentBook.authors)}</Card.Text>
                            <Card.Text>Жанры: {currentBook.genre}</Card.Text>
                            <Card.Text>Рейтинг: {currentBook.rate}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{width : '18rem'}}>
                        <Card.Body>
                            <Card.Title>{'Автор оценки\n'}</Card.Title>
                            <Card.Link href ={'http://localhost:3000/userInfo/'+id_user}>{currentUser.fio}</Card.Link>
                            <div className="mb-3">
                                <Form.Select
                                    onChange={e => setParams({
                                        id_book: params.id_book,
                                        id_user: params.id_user,
                                        rate: params.rate,
                                        comment: params.comment,
                                        status: e.target.value
                                    })}
                                >
                                    <option value="1">Прочитано</option>
                                    <option value="2">Сейчас читаю</option>
                                    <option value="3">Хочу прочитать</option>
                                    <option value="3">Не дочитал</option>
                                </Form.Select>
                            </div>
                            <div className="mb-3">
                                <label  className="form-label">Оценка:</label>
                                <Rating
                                    fractions={2}
                                    initialRating={rating}
                                    onClick={rate => {
                                        setRating(rate)
                                        setParams({
                                            id_book: params.id_book,
                                            id_user: params.id_user,
                                            rate: rating,
                                            comment: params.comment,
                                            status: params.status
                                        })
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label  className="form-label">Коментарий:</label>
                                <input type="text" className="form-control" id="inauthor"
                                       onChange={e => setParams({
                                           id_book: params.id_book,
                                           id_user: params.id_user,
                                           rate: params.rate,
                                           comment: e.target.value,
                                           status: params.status
                                       })}
                                />
                            </div>
                            {
                                (!!user && (user.user.user.id_user === currentUser.id_user || user.user.user.id_rule === 2)) ?
                                <Button variant={"primary"} onClick={onSearchClick}>Добавить/Изменить</Button> : null
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <div className="col-8 order-2 gy-5">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">ФИО</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Комментарий</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.map((item,index) =>(
                                <tr key = {index+(currentPage-1)*10}
                                    onDoubleClick={ e => {
                                        router.push('/bookInfo/'+item.id_user+'/'+id_book)
                                        getData()
                                    }}
                                >
                                    <td>{index+1+(currentPage-1)*10}</td>
                                    <td>{item.fio}</td>
                                    <td>{item.rate}</td>
                                    <td>{item.comment}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Pagination
                            totalPages={Math.ceil(countRecord/10)}
                            page={currentPage}
                            changePage={changePage}
                        />
                    </div>
                </Col>

            </Row>
        </Container>

    );
};

export default BookInfoPage;