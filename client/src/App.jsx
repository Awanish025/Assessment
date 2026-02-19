import './App.css';
import Headers from './components/Headers';
import Home from './pages/Home';
import Register from './pages/Register';
import Edit from './pages/Edit';
import Profile from './pages/Profile';
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/userprofile/:id' element={<Profile />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
