import { useState } from "react"
import { useCredentials } from "../../context"
import { useFurniture } from "../../furnitureContext"
import ProductCard from '../ProductCard/ProductCard'
import { useEffect } from "react"
import './HomePage.css'
import { useNavigate } from "react-router-dom"

function HomePage() {
  const nav = useNavigate()
  const credintials = useCredentials()
  const isConnected = credintials.isConnected
  if (!isConnected) {
    return(
      <div>
          <h1>.</h1>
        <h1>back home</h1>
        <button onClick={()=>nav('/')}>home</button>
        </div>
      )
    } else {
      const furnitureData = useFurniture()
      const furniture = furnitureData.furniture
      const users = credintials.users
      const currentUser = credintials.currentUser
      const [orderedByNew,setOrderedByNew] = useState([])
      const infoOfConnected = users.find((value=>value.userName === currentUser.userName))
      const orderedFurniture = infoOfConnected.pickUpTime
      const [favoritesFurniture,setFavoritesFurniture] = useState([])
      const [pickUpFurniture,setPickUpFurniture] = useState([])
      
      useEffect(()=>{NewestFurniture(),WhoIsConnected()},[])
      
      function NewestFurniture(){
        setOrderedByNew(furniture.sort((a,b)=>a.publishDate < b.publishDate ? 1 : -1).slice(0,4))
      }

      function RemoveFromOrdered(value) {
        const tempUser = {...infoOfConnected , pickUpTime:infoOfConnected.pickUpTime.filter((e)=>e.title !== value.title)}
        const tempFurniture = furniture.find((e)=>e.title === value.title)
        credintials.UpdateUser(tempUser)
        furnitureData.UpdateFurniture({ ...tempFurniture, ordered: false })       
      }
      
      function WhoIsConnected() {
        const tempFurnArray = []
        const tempFurnArray2 = []
        const fav = infoOfConnected.favorites
  fav.forEach((favTitle)=>{
    furniture.some((e)=>e.furnitureID===favTitle) && tempFurnArray.push(furniture.find((e)=>e.furnitureID === favTitle))
  })
  orderedFurniture.forEach((orderedTitle)=>{
    furniture.some((e)=>e.title===orderedTitle.title) && tempFurnArray2.push(furniture.find((e)=>e.title === orderedTitle.title))
  })
  setFavoritesFurniture(tempFurnArray)
  setPickUpFurniture(tempFurnArray2)
}

useEffect(()=>{WhoIsConnected(),NewestFurniture()},[users])

return (
  <>
    <div id="entire-page">
      <div>
    <h1>Welcome {`${currentUser.userName}`}</h1>
    <h2>See whats new:</h2>
      </div>
    <div className="product-container orders" id="new-container">
    <div className="new-products">{orderedByNew.map((value,i) => <ProductCard key={i} info={value}/>)}</div>
    </div>
    <div className="orders">
    <h2>Your orders:</h2>
    <ul>
      {pickUpFurniture[0] ? orderedFurniture.map((value,i)=>
      <li key={i} className="li-ordered">
        <ProductCard info={pickUpFurniture[i]}/>
        <p>
        <h2 >{`${value.title}`}</h2>
        <h3 >{`${value.date}/${value.month}/${value.year}`}</h3>
        <h3 >{`${value.hour}:${value.minutes}`}</h3>
        <h3 >{`${pickUpFurniture[i].address}`}</h3>
        <button onClick={()=>{RemoveFromOrdered(value)}}>remove</button>
        </p>
      </li>
      ) : <li><h2 style={{color:"gray" ,textDecoration:"dashed"}}>nothing in your order list</h2></li>}
    </ul>
    </div>
    <div>
    <h2>Your wishlist:</h2>
    </div >
    <div className="product-container" id="fav-container">
    <div className="new-products">{favoritesFurniture.map((value,i)=><ProductCard key={i} info={value}/>)}</div> 
    </div>
    </div> 
    </>
  )
}}
export default HomePage