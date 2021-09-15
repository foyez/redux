import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addNewItem } from '../store/items/actions'
import { NewItemForm } from '../components/NewItemForm'

// const mapDispatchToProps = {
//   onSubmit: (name, price) => addNewItem(name, price),
// }

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onSubmit: (name, price) => addNewItem(name, price),
    },
    dispatch,
  )
}

export const NewItemFormContainer = connect(null, mapDispatchToProps)(NewItemForm)
