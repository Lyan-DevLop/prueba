import React from 'react'
import Header from './header'
import Footer from './footer'
import {useTheme} from './ThemeContext'

const Layout = ({ children }) => {
  const { darkMode, toggleTheme } = useTheme()
  return (
    <div className={darkMode ? 'theme-dark' : 'theme-light'}>
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
    </div>
  )
}

export default Layout