import Logo from '/logo_2.svg'
import { Link, NavLink } from 'react-router-dom'
import Twitter from '/twitter.svg'
import Discord from '/discord.svg'
import { func } from './NavBar'



const Footer = () => {



  return (
    <div  className='mt-16 lg:mt-20 py-2 border-t border-gray-600 px-12 lg:px-20 lg:py-5'>
      <footer className='flex flex-col gap-10 items-start md:items-center lg:flex-row lg:justify-between'>
        <div>
          <div className='z-10'>
            <Link to="" className='flex items-center min-w-max'>
              <img className="w-16" src={Logo} alt="logo"/><span className='logo-txt '>AMP COMICS</span>
            </Link>
          </div>
        </div>
        <div>
          <div className='flex flex-col items-start  md:items-center gap-4 text-lg lg:flex-row '>          
            <NavLink to="/" className={func} reloadDocument={true}>Home</NavLink>
            <NavLink to="allcomics" className={func}>All Comics</NavLink>
            <NavLink to="savedcomics" className={func}>Saved Comics</NavLink>
          </div>
        </div>
        <div className='flex flex-col gap-4 lg:flex-row items-center'>
          <Link to="http://twitter.com/D_lufuwa" target='_blank'><img src={Twitter} alt='link to discord account' className='h-8 w-8 lg:w-5 lg:h-5'/></Link>
          <Link to="https://discord.com/users/regentolufuwa" target='_blank'><img src={Discord} alt='link to twitter account' className='h-9 w-9 lg:w-6 lg:h-7'/></Link>
        </div>
        <div className='text-xs text-slate-300'>
          <p>Copyright &copy; 2023 AMP COMICS</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer