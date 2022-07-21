import React,{ Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import{ Home, AddBlog, Blog, NotFound, About, Contact } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import './App.css';


function App() {
  return (
    <div className="App">
      <Header/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/#/addBlog" element={<AddBlog/>} />
        <Route path="/#/editBlog/:id" element={<AddBlog/>} />
        <Route path="/#/Blog/:id" element={<Blog/>} />
        <Route path="/#/about" element={<Suspense fallback="...Loading"> <About/> </Suspense>} />
        <Route path="/#/contact" element={<Suspense fallback="...Loading"><Contact/></Suspense>} />
        <Route path="/#/*" element={<Suspense fallback="...Loading"><NotFound/></Suspense>} />
      </Routes>
    </div>
  );
}

export default App;
