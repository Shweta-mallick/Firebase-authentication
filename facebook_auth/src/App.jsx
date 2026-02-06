import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { createContext, useState } from 'react';
import './App.css'
import Login from './components/Login';
import Dashboard from './components/Dashboard';


export const AppContext = createContext()

function App() {

  const [user, setUser] = useState(null);

  return (
    <>
    <AppContext.Provider value={{user,setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
    </>
  )
}

export default App
