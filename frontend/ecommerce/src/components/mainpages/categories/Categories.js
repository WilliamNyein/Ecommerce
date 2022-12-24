import React,{useState,useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

function Categories() {
    const state = useContext(GlobalState);
    const [categories,setCategories] = state.categoryApi.categories
    const [category,setCategory] = useState('')
    const [token] = state.token
    const [callback,setCallback] = state.categoryApi.callback
    const [id,setId] = useState('')
    const [onEdit,setOnedit] = useState(false)

    const createCategory = async(e)=>{
        e.preventDefault();
        try{
           if(onEdit){
            let res = await axios.put(`/api/category/${id}`,
                {name:category},{headers:{Authorization:token}});

                alert(res.data.msg)
           }else{
                let res = await axios.post('/api/category',
                {name:category},{headers:{Authorization:token}})
                alert(res.data.msg)
           }        

            setCallback(!callback)
            setCategory('')
    
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    const editCategory = (id,name)=>{
        setId(id)
        setCategory(name)
        setOnedit(true)
    }

    const deleteCategory = async(id)=>{
        try{
            const res = await axios.delete(`/api/category/${id}`,{
                headers:{Authorization:token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        }catch(err){
            alert(err.response.data.msg)
        }
    }

  return (
    <div className='categories'>
      <form onSubmit={createCategory}>
        <label htmlFor='category'>Category</label>
        <input type="text" name="category" value={category} 
        required onChange={e=>setCategory(e.target.value)}/>
        <button type="submit">{onEdit? 'Update' :'Save'}</button>
      </form>

      <div className='col'>
        {
            categories.map(category=>(
                <div className='row' key={category._id}>
                    <p>{category.name}</p>
                    <div>
                        <button onClick={()=>editCategory(category._id,category.name)}>Edit</button>
                        <button onClick={()=>deleteCategory(category._id)}>Delete</button>
                    </div>

                </div>
                ))
            
        }
         
      </div>
    </div>
  )
}

export default Categories;
