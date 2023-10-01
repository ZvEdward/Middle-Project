import { useLocation, useNavigate } from "react-router-dom"
import { useFurniture } from "../../furnitureContext"
import { useEffect, useState } from "react"
import './ProductPage.css'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useCredentials } from "../../context"
import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { WidthFull } from "@mui/icons-material";



function ProductPage() {
  const location = useLocation()
  const info = location.state.info
  const [picIndex, setPicIndex] = useState(0)
  const [minutes, setMinutes] = useState(30)
  const [hours, setHours] = useState(16)
  const credentials = useCredentials()
  const userData = useCredentials()
  const users = credentials.users
  const connected = credentials.currentUser
  const isSomeOneConnected = credentials.isConnected
  const Navigate = useNavigate()
  const furnitureData = useFurniture()
  const update = credentials.UpdateUser
  const [favButtonBG, setFavButtonBG] = useState('whitesmoke')

  const [favorite, setFavorite] = useState()
  const [color, setColor] = useState();

  //eddies code!
  useEffect(() => {
    if (userData.isConnected && userData.currentUser.favorites.length > 0) {
      if (userData.currentUser.favorites.some((e) => { return e === info.furnitureID })) {
        setFavorite(true);
        setColor(red[500]);
      } else {
        setFavorite(false);
        setColor("default");
      }
    }
  }, [info, userData])


  function handleFavorites() {
    if (!userData.isConnected) {
      return alert("Please log in to save to favorites!")
    }
    if (favorite) {
      setColor("default")
      const tempUser = userData.currentUser;
      const index = tempUser.favorites.indexOf(info.furnitureID);
      if (index !== -1) {
        tempUser.favorites.splice(index, 1);
        userData.setCurrentUser(tempUser)
      }
    }
    else {
      setColor(red[500])
      const tempUser = userData.currentUser;
      tempUser.favorites.push(info.furnitureID)
      userData.setCurrentUser(tempUser)
    }
    setFavorite(!favorite);
    userData.UpdateUser(userData.currentUser);
  }
  //end of eddies code!

  useEffect(() => {
    if (isSomeOneConnected) {
      const indexOfUser = users.findIndex((user) => user.userName === connected.userName)
      const text = users[indexOfUser].favorites;
      if (text.includes(info.furnitureID)) {
        setFavButtonBG('whitesmoke')
      } else {
        setFavButtonBG('#00802D')
      }
    }
  }, [])

  function FindCurrentUser() {
    const tempHourMinute = { ...selectedDate, minutes: minutes, hour: hours }
    if (isSomeOneConnected) {
      if (!info.ordered) {
        const tempUsersArray = users
        const indexOfUser = tempUsersArray.findIndex((user) => user.userName === connected.userName)
        tempUsersArray[indexOfUser].pickUpTime ? tempUsersArray[indexOfUser].pickUpTime = [...tempUsersArray[indexOfUser].pickUpTime, tempHourMinute] : tempUsersArray[indexOfUser].pickUpTime = [tempHourMinute];
        update(tempUsersArray[indexOfUser])
        furnitureData.UpdateFurniture({ ...info, ordered: true })
        Navigate('/home')
        return alert('Order confirmed!')
      } else {
        return alert('This item has already been ordered')
      }
    }
    else {
      return alert('You need to sign-in in order to claim a donation.')
    }
  }

  const [selectedDate, onSelectedDate] = useState(new Date());
  const weakDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const SelectNewDate = (e) => {
    onSelectedDate({ year: e.getFullYear(), month: e.getMonth() + 1, date: e.getDate(), day: e.getDay(), title: info.title })
  }

  function SwichPic() {
    setPicIndex(prev => (prev + 1) % info.photo.length)
  }

  const setMinutesFunction = (value) => {
    if (minutes <= 9) {
      setMinutes(`0${value}`)
    } else {
      setMinutes(value)
    }
    console.log(minutes);
  }



  return (
    <>
      <div id="entire-page-product-page">
        <div style={{ height: "68px" }}></div>
        <section>
          <h1>{info.title}
            <IconButton onClick={handleFavorites} sx={{ my: "auto", color: { color } }} aria-label="add to favorites">
              <FavoriteIcon fontSize='large' />
            </IconButton>
          </h1>
        </section>
        <section id="product-img-container">
          <div id="img-container">
            <img src={info.photo[picIndex]} alt="not found" onClick={SwichPic} className="picture" />
            <h3 id="pic-index">{`${picIndex + 1} / ${info.photo.length}`}</h3>
          </div>
          <div id="description-container">
            <p id="product-descripition">{info.discription}</p>
            {info.description && <p id="product-descripition"><span>Description:</span> {` ${info.description}`}</p>}
            {info.category && <p id="product-descripition"><span>Category:</span>{`${info.category}`}</p>}
            {info.color && <p id="product-descripition"><span>Color: </span>{`${info.color}`}</p>}
            {info.publishDate && <p id="product-descripition"><span>Publish date: </span>{`${info.publishDate}`}</p>}
            {info.collect === 'from wherehouse' ? <span><p id="product-descripition">{`Pickup from wherehouse`}</p></span> : <p id="product-descripition"><span>Pickup from address: </span>{`${info.address}`}</p>}
            {info.donerName && <p id="product-descripition"><span>Donated by: </span>{`${info.donerName}`}</p>}
            {info.donerPhone && <p id="product-descripition"><span>Doner's phone: </span>{`${info.donerPhone}`}</p>}
          </div>
        </section>
        {!info.ordered ? <><section>
          <h2>Order pickup</h2>
        </section>
          <section id="calender-section">
            <div id="calender-container">
              <Calendar onClickDay={SelectNewDate} value={selectedDate} minDate={new Date} />
            </div>
          </section>
          {selectedDate.year && <section id="time-input-container">
            <p style={{ fontSize: "40px", margin: '10px' }}>{`${weakDays[selectedDate.day]} - ${selectedDate.date}/${selectedDate.month}/${selectedDate.year}`}</p>
            <div id="time-input-text">
              <p>at:</p>
              <input id="time-input" type="number" max={23} min={0} value={hours} onChange={(e) => setHours(e.target.value)} />
              <span>:</span>
              <input id="time-input" type="number" max={59} min={0} value={minutes} onChange={(e) => setMinutesFunction(e.target.value)} />
            </div>
            <button id="confirm-order-button" type="button" onClick={() => { FindCurrentUser() }}>Order!</button>
          </section>}</> : <section><h1>This item is already ordered</h1></section>}
      </div>
    </>
  )
}
export default ProductPage