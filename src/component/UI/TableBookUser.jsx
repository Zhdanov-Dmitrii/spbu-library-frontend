import React, {useEffect, useState} from 'react';
import {getBooksUser} from "../../API/getRequest";
import Pagination from "./Pagination";

const TableBookUser = (user) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [countRecord, setCountRecord] = useState(0)
    const [bookUser, setBookUser] = useState([{
        id_bookRead: undefined,
        name: undefined,
        author:undefined,
        status:undefined,
        genre: undefined,
        rate: undefined,
        comment: undefined
    }]);

    useEffect(() => {
        changePage(1)
    },[])


    async function changePage (page){
        setCurrentPage(page)
        console.log(user.user)
        await getBooksUser(user.user,(page-1), getBookUserCallbacl);
    }

    const getBookUserCallbacl = (count, books) => {
        setCountRecord(count)
        setBookUser(books)
    }

    return (
        <div>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Название</th>
                    <th scope="col">Автор</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Жанр</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Комментарий</th>
                </tr>
                </thead>
                <tbody>
                {bookUser.map((item,index) =>(
                    <tr key = {index+(currentPage-1)*10}>
                        <td>{index+1+(currentPage-1)*10}</td>
                        <td>{item.name}</td>
                        <td>{item.author}</td>
                        <td>{item.status}</td>
                        <td>{item.genre}</td>
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
    );
};

export default TableBookUser;