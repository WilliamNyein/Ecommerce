import React,{useContext,useEffect,useState} from 'react'
import { GlobalState } from '../../../GlobalState';
import {Link} from 'react-router-dom'
import axios from 'axios';
import CheckoutButton from './CheckoutButton';


function Cart() {
  const state = useContext(GlobalState);
  const [cart,setCart] =state.userApi.cart;
  const [total,setTotal] = useState(0)
  const [token] = state.token

  useEffect(() => {
    const geTotal = () =>{
      const total = cart.reduce((prev,item)=>{
        return prev + (item.price*item.quantity)
      },0)
      setTotal(total)
    }
    geTotal()
}, [cart]);

const addCart = async()=>{
  await axios.patch('/user/addcart',{cart},
  {headers:{Authorization:token}})
}

const increment = (id)=>{
  cart.forEach(item => {
    if(item._id === item._id){
      item.quantity +=1
    }
  });
  setCart([...cart])
  addCart()
}


const decrement = (id)=>{
  cart.forEach(item=>{
    if(item._id === id){
      item.quantity -=1
    }
  })
  setCart([...cart])
  addCart()
}


const removeProduct = (id)=>{
  if(window.confirm("Do you want to delete this product?")){
    cart.forEach((item,index)=>{
      if(item._id === id){
        cart.splice(index,1)
      }
    })
    setCart([...cart])
    addCart()
  }
}

  if(cart.length===0) return <h2 style={{textAlign:"center",fontSize:"5rem"}}>Cart Empty</h2>;
  return (
    <div>
      {cart.map(detailProduct=>
        <div className='detail cart' key={detailProduct._id}>
        <img src={detailProduct.images.url} alt='' className='img_container' />
        <div className='box-detail'>
  
          <h2>{detailProduct.title}</h2>
          
      
        <span>${detailProduct.price * detailProduct.quantity}</span>
        <p>{detailProduct.description}</p>
        <p>{detailProduct.content}</p>

        <div className='amount'>
          <button onClick={()=> increment(detailProduct._id)}>+</button>
          <span>{detailProduct.quantity}</span>
          <button onClick={()=> decrement(detailProduct._id)}>-</button>
        </div>
      
      <div className='delete' onClick={()=>removeProduct(detailProduct._id)}>x</div>
      </div>
      </div>
        )}

        <div className='total'>
        <h3>Total: $ {total}</h3>
        <CheckoutButton cart ={cart}/>

        </div>
    </div>
  )
}

export default Cart
