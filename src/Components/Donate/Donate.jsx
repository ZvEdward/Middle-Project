import { useState,useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import './Donate.css'
import { useFurniture } from "../../furnitureContext";
import axios from 'axios'
import { useEffect } from "react";

function Donate() {

  const [selectedImage, setSelectedImage] = useState([]);
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const Furniture = useFurniture()
  const CreateNewFurniture = Furniture.createNewFurniture
  const [render,setRender]=useState(true)

    function OnSubmit(data) {
      const newFurniture = data
      newFurniture.furnitureID = CreateRandomFurnitureID()
      newFurniture.photo = selectedImage
      newFurniture.publishDate = `${(new Date).getDate()}/${(new Date).getMonth() +1 }/${(new Date).getFullYear()}`
      CreateNewFurniture(newFurniture)
      navigate('/')
      return alert(`Thank you for your donation! ${newFurniture.title} has been added to the catalog!`)
    }

   

    function CreateRandomFurnitureID (){
      let result = '';
    const UpperCasecharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const LowerCasecharacters = 'abcdefghijklmnopqrstuvwxyz'
    const numbercharacters = '0123456789'
    let counter = 0;
    while (counter < 3) {
      result += UpperCasecharacters.charAt(Math.floor(Math.random() * UpperCasecharacters.length));
      result += LowerCasecharacters.charAt(Math.floor(Math.random() * LowerCasecharacters.length));
      result += numbercharacters.charAt(Math.floor(Math.random() * numbercharacters.length));
      counter += 1;
    }
    return result
    }

    const handleClick = ()=> {
      setSelectedImage([...selectedImage,0],
      console.log(selectedImage),
      ) }
      
      const presetKey = import.meta.env.VITE_KEY
      const cloudName = 'dhzuiixyx'

      const HandleFile = (event,i)=> {
        selectedImage.pop()
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file',file)
        formData.append('upload_preset' , presetKey)
        axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
        .then(res => setSelectedImage([...selectedImage , res.data.secure_url]) )
        .catch(err => console.log(err))
        
         }

         useEffect(()=>{setSelectedImage(selectedImage.filter((v)=>v!==0))},[])
         
    
         return (
           <>
           <div id="donate-page">
       <h1>Donate!</h1>
      <form onSubmit={handleSubmit(OnSubmit)} id="main-form" >
      <label>
        <p>Title:</p>
      <input type="text" placeholder="title" {...register('title', { required: 'title is required', validate: {
        minLength: (v) => v.length >= 5 || 'The title should have at least 5 characters',
        maxLength: (v) => v.length <= 40 || 'The title should have less than 40 characters',
      } })} />
      {errors.title?.message && (
        <small className="error-massage">{errors.title.message}</small>)}
      </label>
      <label>
        <p>Description:</p>
      <input type="text" id="descirtion" {...register('description', { required: 'discription is required'})} />
      {errors.discription?.message && (
        <small className="error-massage">{errors.title.message}</small>)}
      </label>
      <label>
        <p>Add photo:</p>
      <button type="button" onClick={()=>handleClick()}>add photo</button>
      <div id="photo-div">
      {selectedImage.map((value,i)=>
        <label key={i} className="single-photo" style={{ backgroundImage:`url(${selectedImage[i]})`,backgroundRepeat:"no-repeat",backgroundSize:"contain",backgroundPosition:"center" ,backgroundColor:"white"}}>
        <input type="file"  className="file-input" name="ImageStyle" onChange={(event)=>HandleFile(event,i)}/>
          <button type="button" className="delete-button" onClick={()=>setSelectedImage(selectedImage.filter((value)=>value!==selectedImage[i]))}>delete</button>
        </label>)}
      </div>
          </label>
      <label>
        <p>Category</p>
        <select  {...register('category')}>
        <option value="Sofas">Sofas</option>
        <option value="Beds">Beds</option>
        <option value="Tables">Tables</option>
        <option value="Storage">Storage</option>
        <option value="Electronics">Electronics</option>
      </select>
      </label>
      <label>
        <p>Condition:</p>
        <select  {...register('condition')}>
        <option value="Like New">Like New</option>
        <option value="Excellent">Excellent</option>
        <option value="Gently Used">Gently Used</option>
        <option value="Used">Used</option>
        <option value="Salvage">Salvage</option>
      </select>
      </label>
      <label>
      <p>Color</p>
      <select  {...register('color')}>
        <option value="Red">Red</option>
        <option value="Orange">Orange</option>
        <option value="Yellow">Yellow</option>
        <option value="Green">Green</option>
        <option value="Blue">Blue</option>
        <option value="Purple">Purple</option>
        <option value="Pink">Pink</option>
        <option value="Black">Black</option>
        <option value="White">White</option>
        <option value="Grey">Grey</option>
        <option value="Brown">Brown</option>
        <option value="MultiColor">MultiColor</option>
      </select>
      </label>
      <label>
      <p>Pick from:</p>
      <select  {...register('collect',{ required: 'required'})}>
        <option value="blue">from wherehouse</option>
        <option value="red">from my address</option>
      </select>
      {errors.collect?.message && (
        <small className="error-massage">{errors.title.message}</small>)}
      </label>
      <label>
        <p>Doner's name:</p>
      <input type="text" placeholder="name" {...register('donerName', { required: 'name is required', validate: {
        minLength: (v) => v.length >= 1 || 'The name should have at least 1 characters',
        maxLength: (v) => v.length <= 20 || 'The name should have less than 20 characters',
      } })} />
      {errors.donerName?.message && (
        <small className="error-massage">{errors.donerName.message}</small>)}
      </label> 
      <label>
        <p>Phone number:</p>
     <input type="text" placeholder="050-0000000" {...register('donerPhone', { required: "phone number is required", validate: {
       maxLength: (v) =>
       v.length <= 50 || "The phone number should have at most 50 characters",
       matchPattern: (v) =>
       /^[0-9-]+$/.test(v) ||  "phone number must contain only numbers and -",
      },
    })} />
  {errors.donerPhone?.message && (
    <small className="error-massage">{errors.donerPhone.message}</small> )}
    </label>     
      <label>
        <p>Address:</p>
      <input type="text" placeholder="address" {...register('address', { required: 'address is required', validate: {
        minLength: (v) => v.length >= 5 || 'The address should have at least 5 characters',
        maxLength: (v) => v.length <= 40 || 'The address should have less than 40 characters',
      } })} />
      {errors.address?.message && (
        <small className="error-massage">{errors.address.message}</small>)}
      </label>
      <button type="submit" id="submit-button2">submit</button>
      </form>
        </div>
      </>
    )
  }
  export default Donate