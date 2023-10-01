import { useState , useContext} from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../../context'
import './LandingPage.css'
import { red } from "@mui/material/colors"

function LandingPage() {
  const userContext = useContext(UserContext)
  
  const navigate = useNavigate()
  const users = userContext.users || ''
  const Login = userContext.login || ''



  

  return (
    <div id="landing-page">
    <div id="vid-container">
    <video autoPlay muted playsInline loop id="hero-section">
     <source src="https://video.wixstatic.com/video/090e02_2af1e46e688c405e988e8462f2628154/720p/mp4/file.mp4" type="video/mp4"/>
     Your browser does not support the video tag.
     </video>
     <div id="intro-text-container">
     <img id="logo-pic" src="https://static.wixstatic.com/media/090e02_c365689f2bdd47a584dbe08e77dd8399~mv2.png/v1/crop/x_0,y_115,w_500,h_262/fill/w_123,h_64,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/white%20(1).png" alt="photo" />
     <p id="info-text">!האתר המגניב של אדי ועמר! האתר נוצר כחלק מפרויקט האמצע בקורס פולסטאק במכללת סייברפרו, ונועד להיות פלטפורמה נוחה עבור ארגון "רק לפנק" ארגון "רק לפנק". מטרת הארגון לעזור לחיילים בודדים וחיילים ממשפחות קשות יום לקבל תרומות של ריהוט וציוד לבית. אם אתה חייל בודד, הירשם עכשיו באייקון "הירשם" למעלה על מנת לראות מה יש לנו לתת אם אתה מבקש לתרום, לחץ על "תרום" ותשאיר פרטים </p>
     </div>
     <div id="hero-container-1">
      <img id="hero-section2" src="https://res.cloudinary.com/dhzuiixyx/image/upload/v1695236016/rqd4s3dnas03ejkmltfn.png" alt="photo" />
    </div>
    <div id="hero-container-2">
      <img id="hero-section2" src="https://res.cloudinary.com/dhzuiixyx/image/upload/v1695235932/nl8otoicmmjwme86vwsp.png" alt="photo" />
    </div>
    <div id="hero-container-3">
    <span id="info-text2">כל התרומות מגיעות לחיילים בודדים וחיילים ממשפחות קשות יום, את התרומות אפשר לאסוף מהמחסן הראשי של ארגון "רק לפנק" או מבית התורם</span>
    <div id="button-div">
    <button id="submit-button2" onClick={()=>navigate('/donate')}>לתרומה</button>
    </div>
      </div>
    </div>
    </div>
  )
}
export default LandingPage