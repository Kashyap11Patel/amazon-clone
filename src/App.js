import React, { useEffect } from 'react'
import './App.css'
import Header from './Header/Header'
import Home from './Home/Home'
import Checkout from './Checkout/Checkout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login/Login'
import { useStateValue } from './StateProvider'
import { auth } from './firebase'
import Payment from './Payment/Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
const promise = loadStripe(
  'pk_test_51NJvDJSAFcOLl2ZJqXgws7ULMyyuIFjj71Q346DIkwCpRCAybNTen2ofVssUPq6cFWNSEJbqEzgNIPlPYUaaF0UG00DKlKnBSA',
)

function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('the user is >>> ', authUser)

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path='/checkout'
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />
        <Route
          path='/login'
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path='/payment'
          element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
