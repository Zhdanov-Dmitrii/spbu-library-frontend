import React, {useEffect, useState} from 'react';
import Pagination from "../component/UI/Pagination";
import {getBooks, getBooksUser, login} from "../API/getRequest";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";

const BooksPage = (user) => {
    const router = useHistory();

    const [currentPage, setCurrentPage] = useState(1)
    const [countRecord, setCountRecord] = useState(0)
    const [books, setBooks] = useState([{
        id_book: undefined,
        name: undefined,
        author:undefined,
        genre: undefined,
        rate: undefined,
    }]);
    const [params, setParams] = useState({
        name: '',
        author: '',
        genre: ''
    })

    useEffect(() => {
        changePage(1)
    },[])

    async function changePage (page){
        setCurrentPage(page)
        await getBooks(params,(page-1), getBooksCallback);
    }

    const getBooksCallback = (count, books) => {
        console.log(books)
        setCountRecord(count)
        setBooks(books)
    }


    const onSearchClick = async (e) =>{

        setCurrentPage(1);


        let name = document.getElementById("inname").value
        let author = document.getElementById("inauthor").value
        let genre = document.getElementById("ingenre").value

        setParams({
            name: name ? name : '',
            author: author ? author : '',
            genre: genre ? genre : ''
        })
        e.preventDefault();
        console.log(params)

        await getBooks(params,(currentPage-1), getBooksCallback);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-3 mt-3">
                    <form>

                        <div className="mb-3">
                            <label  className="form-label">Название книги:</label>
                            <input type="text" className="form-control" id="inname"
                                   placeholder="Властелин колец"
                                   onChange={e => setParams({
                                       name: e.target.value,
                                       author: params.author,
                                       genre: params.genre
                                       })
                                   }
                            />
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">Автор:</label>
                            <input type="text" className="form-control" id="inauthor"
                                   placeholder="Толкиен"
                                   onChange={e => setParams({
                                           name: params.name,
                                           author: e.target.value,
                                           genre: params.genre
                                       })}
                            />
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">Жанр:</label>
                            <input type="text" className="form-control" id="ingenre"
                                   placeholder="Фэнтези"
                                   onChange={e => setParams({
                                           name: params.name,
                                           author: params.author,
                                           genre: e.target.value
                                       })}
                            />
                        </div>

                        <div className="mb-3">
                            <Button variant={"primary"} onClick={onSearchClick} id="search">Поиск</Button>
                        </div>
                    </form>
                </div>
                <div className="col-8 order-2 gy-5">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Название</th>
                            <th scope="col">Автор</th>
                            <th scope="col">Жанр</th>
                            <th scope="col">Рейтинг</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((item,index) =>(
                            <tr key = {index+(currentPage-1)*10}
                                onDoubleClick={e =>{
                                    if(!!user.user.user.id_user)
                                        router.push('/bookInfo/' + user.user.user.id_user + '/' + item.id_book)
                                }}
                            >
                                <td>{index+1+(currentPage-1)*10}</td>
                                <td>{item.name}</td>
                                <td>{"".concat(item.authors)}</td>
                                <td>{item.genre}</td>
                                <td>{item.rate}</td>
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
            </div>
        </div>
    );
};

export default BooksPage;