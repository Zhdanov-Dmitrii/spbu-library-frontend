import {BrowserRouter} from "react-router-dom";
import PageRouter from "./routes/PageRouter";
import Navibar from "./component/UI/Navibar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";



function App() {
    const [user,setUser] =useState({
        id_user: undefined,
        fio: undefined,
        imageUrl: undefined,
        email: undefined,
        googleId: undefined,
        genre: undefined
    })


  return (
      <BrowserRouter>
          <Navibar
              user={user}
              setUser={setUser}
          />
          <PageRouter
              user={user}
              setUser={setUser}
          />
      </BrowserRouter>
  );
}

export default App;
