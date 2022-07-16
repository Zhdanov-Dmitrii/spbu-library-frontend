import React, {useEffect, useState} from "react";
import {getBooksAuthor} from "../../API/getRequest";
import Pagination from "./Pagination";
import {useHistory} from "react-router-dom";


const TableBookAuthor = (id_user) => {
    const router = useHistory()

    const [currentPage, setCurrentPage] = useState(0)
    const [countRecord, setCountRecord] = useState(0)
    const [booksAuthor, setBooksAuthor] = useState([{
        name: '',
        genre: '',
        rate:''
    }])

    useEffect(() => {
        changePage(1)
    },[])


    async function changePage (page){
        setCurrentPage(page)
        await getBooksAuthor(id_user.id_user,(page-1), getBooksAuthorCallback);
    }

    const getBooksAuthorCallback = (count, books) => {
        setCountRecord(count)
        setBooksAuthor(books)
        console.log(books)
    }

    return(
        <div>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Название</th>
                    <th scope="col">Жанр</th>
                    <th scope="col">Рейтинг</th>
                </tr>
                </thead>
                <tbody>
                {booksAuthor.map((item,index) =>(
                    <tr key = {index+(currentPage-1)*10}
                        onDoubleClick={ e => {
                            console.log(id_user)
                            router.push('/bookInfo/'+id_user.id_user+'/'+item.id_book)
                        }}
                    >
                        <td>{index+1+(currentPage-1)*10}</td>
                        <td>{item.name}</td>
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
    )
}

export default TableBookAuthor