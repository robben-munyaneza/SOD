import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar'; 
import Products from './pages/Products';
import Categories from './pages/Categories';
import Inventory from './pages/Inventory';
import Stockmovement from './pages/Stockmovement';






 function App() {
  return (

    
   <BrowserRouter>
   
    <Routes>
      <Route path='/' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<><Sidebar/><Dashboard/></>} />
      <Route path='/products' element={<><Sidebar/><Products /></>} />
      <Route path='/categories' element={<><Sidebar/><Categories /></>} />
      <Route path='/inventory' element={<><Sidebar/><Inventory /> </>} />
      <Route path='/stockmovement' element={<><Sidebar/><Stockmovement /></>} />
    </Routes>
   </BrowserRouter>

  )
}

export default App
