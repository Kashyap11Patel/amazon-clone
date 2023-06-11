import React from 'react'
import './Subtotal.css'
import { useStateValue } from '../StateProvider'

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue()
  const getTotal = () => {
    let total = 0
    basket?.map((item, id) => (total = total + item.price))
    return total
  }
  return (
    <div className='subtotal'>
      <p>
        Subtotal {basket?.length} items:
        <strong>{currencyFormat(getTotal())}</strong>
      </p>
      <small className='subtotal__gift'>
        <input type='checkbox' />
        This order contains a gift
      </small>

      <button>Proceed to checkout</button>
    </div>
  )
}

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default Subtotal
