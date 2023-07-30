import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from '../StateProvider'
import CheckoutProduct from '../Checkout/CheckoutProduct'
import { Link, useNavigate } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getBasketTotal, getBasketTotalOnly } from '../reducer'
import axios from '../axios'

function Payment() {
  const [state, dispatch] = useStateValue()

  const stripe = useStripe
  const elements = useElements
  const navigate = useNavigate()

  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState('')
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState(true)

  // useEffect(() => {
  //   const getClientSecret = async () => {
  //     const response = await axios({
  //       method: 'post',
  //       url: `/payments/create?total=${getBasketTotalOnly(state.basket) * 100}`,
  //     })
  //     setClientSecret(response.data.clientSecret)
  //   }
  //   getClientSecret()
  // }, [state.basket])

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   setProcessing(true)

  //   const payload = await stripe
  //     .confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     })
  //     .then(({ paymentIntent }) => {
  //       //paymentIntent == payment Cofirmation

  //       setSucceeded(true)
  //       setError(null)
  //       setProcessing(false)

  //       navigate.replace('/oreders')
  //     })
  // }

  // const handleChange = (e) => {
  //   // listen for changes in the card elements
  //   // and display any errors as the coustomer types their card details
  //   setDisabled(e.empty)
  //   setError(e.error ? e.error.message : '')
  // }

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout(<Link to='/checkout'>{state.basket?.length} items</Link>)
        </h1>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{state.user?.email}</p>
            <p>123 react lane</p>
            <p>Bhale road, Bhavnagar</p>
          </div>
        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {state.basket?.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            <form>
              <CardElement />
              <div className='payment__priceContainer'>
                <h3>Order Total: {getBasketTotal(state.basket)}</h3>
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default Payment
