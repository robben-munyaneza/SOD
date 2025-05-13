// Login.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
  const[formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
       const res =await axios.post('http://localhost:5000/auth/login', formData)
       localStorage.setItem('token', res.data.token);
       localStorage.setItem('username', formData.username);
       console.log("login successful")
       navigate('/dashboard')
    }
    catch(error) {
      console.error(error)
    }
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-amber-50'>
    <div className='w-full max-w-md p-8 space-y-8 bg-white rouded-lg shadow-lg'>  
    <h1 className='text-3xl font-bold text-center text-amber-800'>Login</h1>

    <form onSubmit={handleSubmit} className='space-y-6'>

    <div className='space-y-2'>
<label className='block text-sm font-medium text-amber-700'>Username</label>
<input type="text" name="username" onChange={handleChange}  placeholder='username' className='w-full px-3 py-2 border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
required/>
</div>
      <div className='space-y-2'>
        <label>Password</label> 
        <input type="password" name="password" onChange={handleChange} className='w-full px-3
        py-2  border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'/>
        </div>

      <button type="submit" className='w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition duration-300
      '>Login</button>
    </form>
    </div>
    </div>
  )
}

export default Login
