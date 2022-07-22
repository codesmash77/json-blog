import React,{ Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import{ Home, AddBlog, Blog, NotFound, About, Contact } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import './App.css';


function App() {
  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env
  return (
    <div className="App">
      <Header/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path={devEnv? "addBlog": "https://bl0git.herokuapp.com/addBlog"} element={<AddBlog/>} />
        <Route path = {devEnv? "editBlog/:id": "https://bl0git.herokuapp.com/editBlog/:id"} element={<AddBlog/>} />
        <Route path={devEnv? "Blog/:id": "https://bl0git.herokuapp.com/Blog/:id"} element={<Blog/>} />
        <Route path={devEnv? "about": "https://bl0git.herokuapp.com/about"} element={<Suspense fallback="...Loading"> <About/> </Suspense>} />
        <Route path={devEnv? "contact": "https://bl0git.herokuapp.com/contact"} element={<Suspense fallback="...Loading"><Contact/></Suspense>} />
        <Route path={devEnv? "*": "https://bl0git.herokuapp.com/*"} element={<Suspense fallback="...Loading"><NotFound/></Suspense>} />
      </Routes>
    </div>
  );
}

export default App;
