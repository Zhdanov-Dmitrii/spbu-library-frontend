import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getBookGenre, getGenre, getUser, getUserFavoriteGenre, getUsersInfo} from "../API/getRequest";
import {Button} from "react-bootstrap";
import {addBook, addUser, updateBook, updateUser} from "../API/postRequest";
import Pagination from "../component/UI/Pagination";
import tableBookAuthor from "../component/UI/TableBookAuthor";

const AddBookPage = (user) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [countRecord, setCountRecord] = useState(0)
    const [users, setUsers] = useState([{
        id_user: undefined,
        fio: undefined,
        imageUrl: undefined,
        email: undefined,
        googleId: undefined,
        genre: undefined
    }]);
    const [params, setParams] = useState({
        fio: '',
        email: '',
        genre: ''
    })

    const [genre, setGenre] = useState([])
    const {id_user, id_book} = useParams();
    const [currentBook, setCurrentBook] = useState({
        name: ''
    })
    const [authors, setAuthors] = useState([])
    const [bookGenre, setBookGenre] = useState([])

    useEffect(()=>{
        console.log(user)
        getData()
    },[])

    async function getData(){
        if(id_user!=-1){
            console.log(3456678)
            console.log(id_user)
            setAuthors([{id_user:id_user,}])
        }
        if(id_book != -1)
        {
            await getBookGenre(id_book,setBookGenre)
        }
        await getGenre(setGenre)
        await changePage(1)

    }

    async function changePage (page){
        setCurrentPage(page)
        await getUsersInfo(params,(page-1), getUsersCallback);
    }

    const getUsersCallback = (count, users) => {
        console.log(users)
        setCountRecord(count)
        setUsers(users)
    }

    const onSearchClick = async (e) =>{

        setCurrentPage(1);
        e.preventDefault();


        console.log(params)

        await getUsersInfo(params,(currentPage-1), getUsersCallback);
    }

    return(

        <div className="container">
            <div className="row">
                <div className="col-3 mt-3">
                    <div className="mb-3">
                        <div className="mb-3">
                            <label  className="form-label">ФИО:</label>
                            <input type="text" className="form-control" id="fio"
                                   onChange={e => setParams({
                                       fio: e.target.value,
                                       email: params.email,
                                       genre: params.genre
                                   })
                                   }
                            />
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Email:</label>
                            <input type="text" className="form-control" id="inauthor"
                                   onChange={e => setParams({
                                       fio: params.fio,
                                       email: e.target.value,
                                       genre: params.genre
                                   })}
                            />
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Любимые жанры:</label>
                            <input type="text" className="form-control" id="ingenre"
                                   onChange={e => setParams({
                                       fio: params.fio,
                                       email: params.email,
                                       genre: e.target.value
                                   })}
                            />
                        </div>

                        <div className="mb-3">
                            <Button variant={"primary"} onClick={onSearchClick} id="searchUsers">Поиск пользователей</Button>
                        </div>

                        <label>Название книги</label>
                        <input type="text" className="form-control" id="fio"
                               value={currentBook.fio}
                               onChange={e => setCurrentBook({
                                   name:e.target.value
                               })}
                        />
                    </div>
                    <div className="mb-3">
                        <Button variant={"primary"}
                                onClick={()=>{
                                    var strBG = ""
                                    var strBA = ""
                                    for(var i = 0; i < bookGenre.length; i++)
                                        strBG += bookGenre[i].id_genre+","
                                    strBG = strBG.slice(0, -1)

                                    for(var i = 0; i < authors.length;i++)
                                        strBA += authors[i].id_user+","
                                    strBA = strBA.slice(0, -1)

                                    console.log(authors)
                                    if(id_book == -1)
                                        addBook(currentBook,strBG, strBA)
                                    else
                                        updateBook(id_book, bookGenre, strBG, strBA)
                                }}>
                            Добавить книгу
                        </Button>
                    </div>
                </div>
                <div className="col-8 mt-3">
                    <h1>Жанры</h1>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Жанр</th>
                        </tr>
                        </thead>
                        <tbody>
                        {genre.map((item,index) =>(
                            <tr key = {index}
                                className={(bookGenre.find(el => el.id_genre === item.id_genre) !== undefined) ? "table-success" : "table-default"}
                                onClick={e =>{
                                    if (bookGenre.find(el => el.id_genre === item.id_genre) === undefined) {
                                        e.target.parentNode.classList.add("table-success")
                                        bookGenre.push(item)
                                        console.log(bookGenre)
                                    } else{
                                        console.log(bookGenre)
                                        e.target.parentNode.classList.remove("table-success")
                                        bookGenre.splice(bookGenre.indexOf(item),1)
                                    }
                                }}
                            >
                                <td>{index}</td>
                                <td>{item.genre}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <h1>Список пользователей</h1>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">ФИО</th>
                            <th scope="col">email</th>
                            <th scope="col">Жанр</th>

                        </tr>
                        </thead>
                        <tbody>
                        {users.map((item,index) =>(
                            <tr key = {index+(currentPage-1)*10}
                                className={(authors.find(el => el.id_user === item.id_user) !== undefined) ? "table-success" : "table-default"}
                                onClick={e =>{
                                    if (authors.find(el => el.id_user === item.id_user) === undefined) {
                                        e.target.parentNode.classList.add("table-success")
                                        authors.push(item)
                                        console.log(bookGenre)
                                    } else{
                                        console.log(bookGenre)
                                        e.target.parentNode.classList.remove("table-success")
                                        authors.splice(authors.indexOf(item),1)
                                    }
                                }}
                            >
                                <td>{index+1+(currentPage-1)*10}</td>
                                <td>{item.fio}</td>
                                <td>{item.email}</td>
                                <td>{item.genre}</td>
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
    )
}

export default AddBookPage;