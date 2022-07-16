import axios from "axios";
import user from "../pages/UserInfoPage";
import {responsivePropType} from "react-bootstrap/createUtilityClasses";

export const login = async (user, callback) => (

    await axios.get('http://127.0.0.1:5000/login/?googleId=' + user.googleId
    + '&fio=' + user.name + '&email=' + user.email + '&imageUrl=' + user.imageUrl)
        .then(response => {
            console.log(response.data.userInfo)
            callback(response.data.userInfo);
        })
        .catch(error => {
            alert(error.toString());
        })
)

export  const getUser = async (id_user, callback) => {
    await axios.get('http://127.0.0.1:5000/getUser/?id_user='+id_user)
        .then(response => {
            callback(response.data.user);
        })
        .catch(error =>{
            alert(error.toString())
        })


}

export const getGenre = async (callback) => {
    await axios.get('http://127.0.0.1:5000/getGenre/')
        .then(response =>{
            console.log(response.data.genre)
            callback(response.data.genre);
        })
        .catch(error=> {
            alert(error.toString())
        })
}

export const getUserFavoriteGenre = async (id_user, callback) => {
    await axios.get('http://127.0.0.1:5000/getUserFavoriteGenre/?id_user='+id_user)
        .then(response =>{
            callback(response.data.genre);
        })
        .catch(error =>{
            alert(error.toString())
        })
}

export const getBook = async(id_book, callback) =>{
    await axios.get('http://127.0.0.1:5000/getBook/?id_book='+id_book)
        .then(response => {
            callback(response.data.book)
        })
        .catch(error =>{
            alert(error.toString())
        })
}

export const getBooksUser = async (id_user, page, callback) => {
    await axios.get('http://127.0.0.1:5000/getBooksUser/?id_user='+id_user.id_user+'&limit=10&page='+page)
        .then(response => {
            callback(response.data.countRecord, response.data.booksUser);
        })
        .catch(error => {
            alert(error.toString());
        })
}

export const getBooks = async (params, page, callback) =>{

    console.log(params)
    console.log(page)

    await axios.get('http://127.0.0.1:5000/getBooks/?name='+params.name
    + '&author=' + params.author + '&genre=' + params.genre + '&limit=10&page='+page)
        .then(response => {
            callback(response.data.countRecord, response.data.books)
        })
        .catch(error => {
            alert(error.toString())
        })
}

export const getUsersInfo = async (params, page, callback) =>{

    console.log(params)
    console.log(page)

    await axios.get('http://127.0.0.1:5000/getUsers/?fio='+params.fio
        + '&email=' + params.email + '&genre=' + params.genre + '&limit=10&page='+page)
        .then(response => {
            callback(response.data.countRecord, response.data.users)
        })
        .catch(error => {
            alert(error.toString())
        })
}

export const getRead = async (params, callback) =>{

    let bodyFormData = new FormData();

    console.log(params)
    bodyFormData.append("id_book", params.id_book)
    bodyFormData.append("id_user", params.id_user)
    bodyFormData.append("rate", params.rate)
    bodyFormData.append("comment", params.comment)
    bodyFormData.append("status", params.status)


    await axios({
        method: "post",
        url: 'http://127.0.0.1:5000/addRead/',
        data: bodyFormData
    })
        .then(response => {
            callback(response.data.res)
        })
        .catch(error => {
            alert(error.toString())
        })
}

export const getReadUsers = async (id_book, page, callback) =>{

    await axios.get('http://127.0.0.1:5000/getReadUsers/?id_book='+ id_book + '&limit=10&page='+page)
        .then(response => {
            callback(response.data.countRecord, response.data.readUsers)
        })
        .catch(error => {
            alert(error.toString())
        })
}

export const getBooksAuthor = async (id_user,page, callback) =>{

    await axios.get('http://127.0.0.1:5000/getBooksAuthor/?id_user='+id_user+'&limit=10&page='+page)
        .then(response => {
            callback(response.data.countRecord, response.data.books)
        })
        .catch(error =>{
            alert(error.toString())
        })
}

export const getBookGenre = async (id_book, callback)=>{
    axios.get('http://127.0.0.1:5000/getBookGenre/?id_book='+id_book)
        .then(response =>{
            callback(response.data.genre)
        })
        .catch(error => {
            alert(error.toString())
        })
}