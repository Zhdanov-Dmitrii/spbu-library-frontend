import userInfo from "../component/UI/UserInfo";
import axios from "axios";


export const addUser = async (user, favoriteGenre) =>{
    let bodyFormData = new FormData();

    console.log(user)
    console.log(favoriteGenre)
    bodyFormData.append("fio", user.fio)
    bodyFormData.append("imageUrl", user.imageUrl)
    bodyFormData.append("email", user.email)
    bodyFormData.append("googleId", user.googleId)
    bodyFormData.append("id_rule", user.id_rule)
    bodyFormData.append("favoriteGenre", favoriteGenre)


    await axios({
        method: "post",
        url: 'http://127.0.0.1:5000/addUser/',
        data: bodyFormData
    })

}

export  const updateUser = async (user, favoriteGenre) => {
    let bodyFormData = new FormData();

    console.log(user)
    console.log(favoriteGenre)
    bodyFormData.append("id_user", user.id_user)
    bodyFormData.append("fio", user.fio)
    bodyFormData.append("imageUrl", user.imageUrl)
    bodyFormData.append("email", user.email)
    bodyFormData.append("googleId", user.googleId)
    bodyFormData.append("id_rule", user.id_rule)
    bodyFormData.append("favoriteGenre", favoriteGenre)


    await axios({
        method: "post",
        url: 'http://127.0.0.1:5000/updateUser/',
        data: bodyFormData
    })
}

export const setRule = async (user, rule) =>{
    let bodyFormData = new FormData();

    bodyFormData.append("id_user", user.id_user)
    bodyFormData.append("id_rule", rule)


    await axios({
        method: "post",
        url: 'http://127.0.0.1:5000/setRule/',
        data: bodyFormData
    })
}

export const addBook = async (book, bookGenre, bookAuthor)=>{
    let bodyFormData = new FormData();

    bodyFormData.append("name", book.name)
    bodyFormData.append("bookGenre", bookGenre)
    bodyFormData.append("bookAuthor", bookAuthor)

    console.log(book)
    console.log(bookGenre)
    console.log(bookAuthor)

    await axios({
        method: "post",
        url: 'http://127.0.0.1:5000/addBook/',
        data: bodyFormData
    })
}

export const updateBook = async (id_book, book, bookGenre, bookAuthor)=>{
    let bodyFormData = new FormData();

    bodyFormData.append("name", book.name)
    bodyFormData.append("id_book", id_book)
    bodyFormData.append("bookGenre", bookGenre)
    bodyFormData.append("bookAuthor", bookAuthor)

    console.log(book)
    console.log(bookGenre)
    console.log(bookAuthor)

    await axios({
        method: "post",
        url: 'http://127.0.0.1:5000/addBook/',
        data: bodyFormData
    })
}