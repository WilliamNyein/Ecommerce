import React,{useState,useEffect} from 'react'
import axios from 'axios';

function UserApi(token) {
    const [isLogged,setIsLogged] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)
    const [cart,setCart] = useState([])
    const [userId,setUserId] = useState(null)
 
        const addCart = async(product)=>{
            if(!isLogged) return alert("Please login to purchase")
        const check = cart.every(item=>{
            return item._id !== product._id
        })
        if(check) {
            setCart([...cart,{...product,quantity:1}])
            await axios.patch('/user/addcart',{cart:[...cart,{...product,
            quantity:1}]},{headers:{Authorization:token}})
        }else{
            alert("This product has been added to cart")
        }}

    useEffect(()=>{
        if(token){
            const getUser = async()=>{
                try{
                    const res = await axios.get('/user/infor',
                    {headers: {Authorization:token}  });
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true):setIsAdmin(false);
                    setCart(res.data.cart)
                    setUserId(res.data._id)
                }catch(err){
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])
  return ({
    isLogged:[isLogged,setIsLogged],
    isAdmin:[isAdmin,setIsAdmin],
    addCart: addCart,
    cart:[cart,setCart],
    id:[userId]
}
  )
}

export default UserApi;
