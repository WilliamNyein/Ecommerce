import React,{useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './Icon/bars.svg'
import Cart from './Icon/cart.svg'
import Close from './Icon/xmark.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'


function Header() {
    const state = useContext(GlobalState)
    const [isAdmin,setIsAdmin] = state.userApi.isAdmin;
    const [isLogged,setIsLogged] = state.userApi.isLogged;
    const [cart,setCart] =state.userApi.cart;

    const logoutUser = async()=>{
      await axios.get('/user/logout')
      localStorage.clear()
      window.location.href='/'
    }

    const adminRouter = ()=>{
      return(
        <>
        <li><Link to='/create_product'>Create Product</Link></li>
        <li><Link to='/category'>Categories</Link></li>
        </>
      )
    }

    const loggedRouter = ()=>{
      return(
        <>
        <li><Link to='/history'>History</Link></li>
        <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
      </>
      )
    } 
  return (
    <div>
      <header>
      <div className='menu'>
        <img src={Menu} alt='' width='30'/>
      </div> 

      <div className='logo'>
        <h1>
        <Link to='/'>{isAdmin?'Admin':'Clover Bay'}</Link>
        </h1>
      </div>

      <ul>
        <li><Link to='/'>{isAdmin?'Products':'Shop'}</Link></li>
        {isAdmin&&adminRouter()}
        {isLogged? loggedRouter(): <li><Link to='/login'>Login * Register</Link></li>}
        <li><img src={Close} alt='' width='30' className='menu' /></li>
      </ul>
      {isAdmin?'':
      <div className='cartIcon'>
        <span>{cart.length}</span>
        <Link to='/cart'>
        <img src={Cart} width='30'/>
        </Link>
      </div>}
      </header>
    </div>
  )
}

export default Header
