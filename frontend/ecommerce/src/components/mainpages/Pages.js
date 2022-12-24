import React,{useContext} from 'react'
import {Routes,Route} from "react-router-dom"
import Login from './auth/Login'
import Cart from './cart/Cart'
import Products from './products/Products'
import Register from './auth/Register'
import Notfound from './utils/NotFound/Notfound'
import DetailProduct from './detailProduct/DetailProduct'
import { GlobalState } from '../../GlobalState'
import CheckoutSuccess from './cart/CheckoutSuccess'
import Categories from './categories/Categories'
import Createproducts from './createproducts/Createproducts'

function Pages() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userApi.isLogged
  const [isAdmin] =state.userApi.isAdmin
  return (

    <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/detail/:id" element={<DetailProduct/>}/>
        <Route path="/login"  element={isLogged? <Notfound/>:<Login/>}/>
        <Route path="/category" element={isAdmin?<Categories/>:<Notfound/>} />
        <Route path="/create_product" element={isAdmin?<Createproducts/>:<Notfound/>} />
        <Route path="/register"  element={<Register/>}/>
        <Route path="/cart"  element={<Cart/>}/>
        <Route path="/checkout-success" element={<CheckoutSuccess/>}/>
        <Route path='*' element={<Notfound/>} />
    </Routes>
  )
}

export default Pages;
