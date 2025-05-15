import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {ThemeProvider} from'./components/ThemeContext'
import Layout from './components/layout'
import Home from './pages/home'
import Products from './pages/products'
import User from './pages/user'

function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/usuarios" element={<User />} />
          {/* Agrega más rutas según necesites */}
        </Routes>
      </Layout>
    </BrowserRouter>
    </ThemeProvider>  
  )
}

export default App
