import React from 'react'
import Editor from './pages/Editer'
import './app.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path='' element={<Home />} />
      <Route path='/editor' element={<Editor />} />
    </Routes>
  )
}

export default App