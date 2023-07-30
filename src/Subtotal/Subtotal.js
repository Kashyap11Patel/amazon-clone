import React from 'react'
import './Subtotal.css'
import { useStateValue } from '../StateProvider'
import { useNavigate } from 'react-router-dom'
import { getBasketTotal } from '../reducer'

function Subtotal() {
  const navigate = useNavigate()
  const [{ basket }, dispatch] = useStateValue()
  return (
    <div className='subtotal'>
      <p>
        Subtotal {basket?.length} items:
        <strong>{getBasketTotal(basket)}</strong>
      </p>
      <small className='subtotal__gift'>
        <input type='checkbox' />
        This order contains a gift
      </small>

      <button onClick={(e) => navigate('/payment')}>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal
