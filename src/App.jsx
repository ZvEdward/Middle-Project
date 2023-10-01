import './App.css'
//hooks
import { useState } from 'react'

//components
import LandingPage from './Components/LandingPage/LandingPage'
import SignUp from './Components/SignUp/SignUp'
import HomePage from './Components/HomePage/HomePage'
import Catalog from './Components/Catalog/Catalog'
import ProductPage from './Components/ProductPage/ProductPage'
import ConfirmOrder from './Components/ConfirmOrder/ConfirmOrder'
import OrderConfirmed from './Components/OrderConfirmed/OrderConfirmed'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Donate from './Components/Donate/Donate'
//libreries
import { Routes, Route } from 'react-router-dom'
import Payment from './Payment/Payment'

function App() {

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/profile" element={<SignUp />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/productPage" element={<ProductPage />} />
                <Route path="/confirmOrder" element={<ConfirmOrder />} />
                <Route path="/orderConfirmed" element={<OrderConfirmed />} />
                <Route path="/money donation" element={<Payment />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App


// theme =
// main: '#00802D',
// secondary: '#37F715'
