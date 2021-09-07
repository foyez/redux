import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MenuItem } from '../components/MenuItem'
import { removeItem, updatePrice, updateQuantity } from '../store/items/actions'
import { selectItemTotal } from '../store/items/selectors'

const mapStateToProps = (state, props) => ({
  total: selectItemTotal(state, props),
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const { uuid } = ownProps
  return bindActionCreators(
    {
      remove: () => removeItem(uuid),
      updatePrice: (price) => updatePrice(uuid, price),
      updateQuantity: (quantity) => updateQuantity(uuid, quantity),
    },
    dispatch,
  )
}

export const MenuItemContainer = connect(mapStateToProps, mapDispatchToProps)(MenuItem)
