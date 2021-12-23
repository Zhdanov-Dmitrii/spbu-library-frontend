import axios from "axios";
import user from "../pages/UserInfoPage";


export const login = async (user, callback) => (

    await axios.get('http://4ffc-217-197-0-75.ngrok.io/login/?googleId=' + user.googleId
    + '&fio=' + user.name + '&email=' + user.email + '&imageUrl=' + user.imageUrl)
        .then(response => {
            console.log(response.data.userInfo)
            callback(response.data.userInfo);
        })
        .catch(error => {
            alert(error.toString());
        })
)

export const getBooksUser = async (user, page, callback) => {


    await axios.get('http://4ffc-217-197-0-75.ngrok.io/getBooksUser/?id_user='+user.id_user+'&limit=10&page='+page)
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

    await axios.get('http://4ffc-217-197-0-75.ngrok.io/getBooks/?name='+params.name
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

    await axios.get('http://4ffc-217-197-0-75.ngrok.io/getUsers/?fio='+params.fio
        + '&email=' + params.email + '&genre=' + params.genre + '&limit=10&page='+page)
        .then(response => {
            callback(response.data.countRecord, response.data.users)
        })
        .catch(error => {
            alert(error.toString())
        })
}