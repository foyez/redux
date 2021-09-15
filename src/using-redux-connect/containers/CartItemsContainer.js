import { connect } from 'react-redux'
import { CartItems } from '../components/CartItems'

const mapStateToProps = (state) => ({
  items: state.items,
})

export const CartItemsContainer = connect(mapStateToProps)(CartItems)
