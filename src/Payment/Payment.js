import React from 'react'
import './Payment.css'
import { useStateValue } from '../StateProvider'
import CheckoutProduct from '../Checkout/CheckoutProduct'
import { Link } from 'react-router-dom'

function Payment() {
  const [state, dispatch] = useStateValue()
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
        </div>
      </div>
    </div>
  )
}

export default Payment
