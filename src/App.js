import "./App.css";
import {Routes, Route} from 'react-router-dom';
import Login from './Components/Login';
import Home from "./Components/Home";
import {app, database} from './firebaseConfig';
import Editor from './Components/Editor';

export default function App(){
  return (
    <div className="App">
      <div className="heading-top"><h1>Google Docs Clone</h1></div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route exact path='/home' element={<Home database = {database}/>}/>
        <Route path='*' element={<h1>Page not Found</h1>} />
        <Route path="/editor/:id" element={<Editor database = {database}/>} />
      </Routes>
    </div>
  );
}