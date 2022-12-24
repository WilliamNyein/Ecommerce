import React,{useState,useContext} from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';

const initialState = {
    product_id:'',
    title:'',
    price:0,
    description:"Mock market",
    content:"Mock content",
    category:''
}

function Createproducts() {
    const state = useContext(GlobalState)
    const [product,setProduct] = useState(initialState)
    const [images,setImages] = useState(false)
    const [categories] = state.categoryApi.categories
    const [isAdmin] = state.userApi.isAdmin
    const [token] = state.token

    const styleUpload = {
        display : images ? "block" : "none"
    }

    const handleUpload = async(e)=>{
        e.preventDefault();
        try{
            if(!isAdmin) return alert("u are not admin");
            const file = e.target.files[0]
            console.log(file)

            if(!file) return alert("file doesn't exist")
            if(file.size > 1024*1024) return alert("file size too large")
            if(file.type !=='image/jpeg' && file.type !=='image/png') return alert("file format is incorrect")

            let formdata = new FormData()
            formdata.append('file',file)

            const res = await axios.post('api/upload',formdata,{
                headers:{'content-type': 'multipart/form-data',Authorization:token}
            })
            console.log(res)
            setImages(res.data)

        }catch(err){
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async()=>{
        try{
        if(!isAdmin) return alert("u are not admin")
        await axios.post('/api/destory',{public_id:images.public_id},{
            headers:{Authorization:token}
        });
        setImages(false)}
        catch(err){
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = (e)=>{
        const {name,value} = e.target;
        setProduct({...product,[name]:value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            if(!isAdmin) return alert("u are not admin")
            if(!images) return alert("no images")
            await axios.post('/api/products',{...product,images},{
                headers:{Authorization:token}
            })
            setImages(false)
            setProduct(initialState)
        }catch(err){
            return alert(err.response.data.msg)
        }
    }

  return (
    <div className='create_product'>
      <div className='upload'>
        <input type='file' name='file' id="file_up" onChange={handleUpload} />
        <div id="file-img" style={styleUpload}>
            <img src={images? images.url:''} alt="" />
            <span onClick={handleDestroy}>x</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='row'>
            <label htmlFor='product_id'>Product ID</label>
            <input type="text" name="product_id" id="product_id"
            required value={product.product_id} onChange={handleChangeInput} />
        </div>

        <div className='row'>
            <label htmlFor='title'>Title</label>
            <input type="text" name="title" id="title"
            required value={product.title} onChange={handleChangeInput} />
        </div>

        <div className='row'>
            <label htmlFor='product_id'>Price</label>
            <input type="text" name="price" id="price"
            required value={product.price} onChange={handleChangeInput} />
        </div>
        
        <div className='row'>
            <label htmlFor='description'>Description</label>
            <textarea type="text" name="description" id="description"
            required value={product.description} onChange={handleChangeInput} rows="5"/>
        </div>

        <div className='row'>
            <label htmlFor='content'>Content</label>
            <textarea type="text" name="content" id="content"
            required value={product.content} onChange={handleChangeInput} rows="7"/>
        </div>

        <div className='row'>
            <label htmlFor='category'>Product ID</label>
            <select name="category" value={product.category} onChange={handleChangeInput}>
                <option value=''>Please select a category</option>
               {
                categories.map(category=>(
                    <option value={category._id} key={category._id}>
                        {category.name}
                    </option>
                ))
               }
            </select>
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Createproducts;
