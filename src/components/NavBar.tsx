
import Logo from '/logo.svg'
import Menu from '/menu.svg'
import Close from '/close.svg'
import { Link } from "react-router-dom"
import { useState } from 'react'



const NavBar = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  const body = document.querySelector('body')

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    body?.classList.toggle('overflow-hidden')
  }

  return (
    <header className="pb-3 md:py-3 bg-[#0e0d0d]">
      <nav className="flex justify-between items-center w-[92%] mx-auto" >
        <div className='z-50'>
          <Link to="" className='flex items-center min-w-max'>
            <img className="w-16" src={Logo} alt="logo"/><span className='logo-txt '>AMP COMICS</span>
          </Link>
        </div>
        <div className={`nav-link-container duration-300 absolute min-h-[70vh] left-0 top-[-100%] w-full flex items-center px-16 md:px-5 md:static md:min-h-max md:w-auto ${menuOpen && 'top-[0%] z-40 bg-[#0e0d0d]'}`}>
          <ul className="flex flex-col gap-8 md:flex-row md:items-center md:gap-[4vw] ">
            <li><Link to=""  className='text-slate-300 text-base font-normal duration-200 hover:text-blue-400' onClick={toggleMenu}>Home</Link></li>
            <li><Link to="allcomics" className='text-slate-300 text-base font-normal duration-200 hover:text-blue-400' onClick={toggleMenu}>All Comics</Link></li>
            <li><Link to="savedcomics" className='text-slate-300 text-base font-normal duration-200 hover:text-blue-400' onClick={toggleMenu}>Saved Comics</Link></li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <div 
            className={`cursor-pointer h-10 md:hidden z-50`}
            onClick={toggleMenu}
          >
            {
              menuOpen ? <img src={Close} alt="close menu" /> : <img src={Menu} alt="hamburger menu" />
            }
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBar