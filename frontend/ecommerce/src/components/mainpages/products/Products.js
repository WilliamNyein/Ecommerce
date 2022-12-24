import React,{useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/NotFound/ProductItem/ProductItem'

function Products() {
  const state = useContext(GlobalState)
  const [products] = state.productsApi.products
  const [isAdmin,setIsAdmin] =state.userApi.isAdmin
  const addCart = state.userApi.addCart
  

  return (
    <div className='products'>
      {products.map(product => { return <ProductItem key={product._id} 
      product={product} isAdmin={isAdmin} addCart={addCart}/>})}
    </div>
  )
}

export default Products
