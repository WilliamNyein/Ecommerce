import React,{useContext} from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'

function CheckoutButton({cart}) {
    const state = useContext(GlobalState)
    const [id] = state.userApi.id
    const handleCheckout = ()=>{
        axios.post('/api/stripe/create-checkout-session', {
            cart,userId:id
        }).then(res=>{
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch(err=>console.log(err.message))
    }
  return (
    <div>
      <button onClick={()=>handleCheckout()}>Checkout</button>
    </div>
  )
}

export default CheckoutButton
