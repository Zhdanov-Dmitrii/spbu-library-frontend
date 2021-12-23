import React, {useState} from 'react';
import {getBooks, getUsersInfo} from "../API/getRequest";
import Pagination from "../component/UI/Pagination";
import {currentUser} from "../Constants/currentUserInfo";
import router from "react-router-dom/es/Router";
import {useHistory} from "react-router-dom";

const UsersPage = (user) => {
    const router = useHistory()
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-3 mt-3">
                    <form>

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
                            <button onClick={onSearchClick} id="searchUsers">Поиск</button>
                        </div>
                    </form>
                </div>
                <div className="col-8 order-2 gy-5">
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
                                onDoubleClick={ e => {
                                    currentUser.fio =item.fio;
                                    currentUser.id_user= item.id_user;
                                    currentUser.email = item.email;
                                    currentUser.imageUrl = item.imageUrl;
                                    currentUser.genre = item.genre;
                                    currentUser.googleId = item.googleId;
                                    router.push('/userInfo')
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
    );
};

export default UsersPage;