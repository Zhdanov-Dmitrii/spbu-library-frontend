import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getGenre, getUser, getUserFavoriteGenre} from "../API/getRequest";
import {Button} from "react-bootstrap";
import {addUser, updateUser} from "../API/postRequest";


const AddUserPage = (user) => {

    const [genre, setGenre] = useState([{}])
    const [favoriteGenre, setFavoriteGenre] = useState([])
    const {id_user} = useParams();
    const [currentUser, setCurrentUser] = useState({
        id_user:id_user,
        fio:'',
        imageUrl:'',
        email:'',
        googleId:'',
        rule:''
    })

    useEffect(()=>{
        console.log(user)
        getData()
    },[])

    async function getData(){
        if(id_user !== -1)
        {
            await getUser(id_user, setCurrentUser)
            await getUserFavoriteGenre(id_user, setFavoriteGenre)
        }
        await getGenre(setGenre)


    }

    return(

        <div className="container">
            <div className="row">
                <div className="col-3 mt-3">
                    <div className="mb-3">
                        <label>ФИО пользователя</label>
                        <input type="text" className="form-control" id="fio"
                               value={currentUser.fio}
                               onChange={e => setCurrentUser({
                                   fio: e.target.value,
                                   imageUrl: currentUser.imageUrl,
                                   email: currentUser.email,
                                   id_user: currentUser.id_user,
                                   googleId:currentUser.googleId,
                                   rule:currentUser.rule,
                               })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Url изображения</label>
                        <input type="text" className="form-control" id="fio"
                               value={currentUser.imageUrl}
                               onChange={e => setCurrentUser({
                                   fio: currentUser.fio,
                                   imageUrl: e.target.value,
                                   email: currentUser.email,
                                   id_user: currentUser.id_user,
                                   googleId:currentUser.googleId,
                                   rule:currentUser.rule,
                               })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>email</label>
                        <input type="text" className="form-control" id="fio"
                               value={currentUser.email}
                               onChange={e => setCurrentUser({
                                   fio: currentUser.fio,
                                   imageUrl: currentUser.imageUrl,
                                   email: e.target.value,
                                   id_user: currentUser.id_user,
                                   googleId:currentUser.googleId,
                                   rule:currentUser.rule,
                               })}
                        />
                    </div>
                    <div className="mb-3">
                        <Button variant={"primary"}
                                onClick={()=>{
                                    var strFG = ""
                                    for(var i = 0; i < favoriteGenre.length; i++)
                                        strFG += favoriteGenre[i].id_genre+","
                                    strFG = strFG.slice(0, -1)
                                    if(id_user === -1)
                                        addUser(currentUser, strFG)
                                    else
                                        updateUser(currentUser, strFG)
                                }}>
                            Добавить Книгу
                        </Button>
                    </div>
                </div>
                <div className="col-8 mt-3">
                    <label>Жанры</label>
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
                                className={(favoriteGenre.find(el => el.id_genre === item.id_genre) !== undefined) ? "table-success" : "table-default"}
                                onClick={e =>{
                                    if (favoriteGenre.find(el => el.id_genre === item.id_genre) === undefined) {
                                        e.target.parentNode.classList.add("table-success")
                                        favoriteGenre.push(item)
                                        console.log(favoriteGenre)
                                    } else{
                                        console.log(favoriteGenre)
                                        e.target.parentNode.classList.remove("table-success")
                                        favoriteGenre.splice(favoriteGenre.indexOf(item),1)
                                    }
                                }}
                            >
                                <td>{index}</td>
                                <td>{item.genre}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AddUserPage;