// import './App.css';
import Footer from './Component/Footer/Footer';
import Header from './Component/Header/Header';
import LandingPage from './Screens/LandingPage/LandingPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MyNotes from './Screens/MyNotes/MyNotes';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import CreateNote from './Screens/CreateNote/CreateNote';
import EditNote from './Screens/EditNote/EditNote.js';
import { useState } from 'react';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen.js';

const App = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <BrowserRouter>
    <Header setSearch={setSearch} />
      <Routes>
        
        <Route path='/' Component={LandingPage} />
        <Route path='/register' Component={RegisterScreen} />
        <Route path='/login' Component={LoginScreen} />
        <Route path='/profile' Component={ProfileScreen} />
        <Route path='/MyNotes' Component={() => <MyNotes search={search} />} />
        <Route path='/createnote' Component={CreateNote} />
        <Route path="/note/:id" Component={EditNote} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
