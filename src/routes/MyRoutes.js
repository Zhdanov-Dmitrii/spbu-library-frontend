import MainPage from "../pages/MainPage";
import UserInfoPage from "../pages/UserInfoPage";




export const MyRoutes =[
    {path: '/main', component: MainPage, exact: true , key: 1},
    {path: '/userInfo', component: UserInfoPage, exact: true , key: 2},
]
