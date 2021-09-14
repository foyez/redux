import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const Actions = {
  ITEM_ADDED: 'ITEM_ADDED',
}

const addNewItem = (name, price) => ({
  type: Actions.ITEM_ADDED,
  payload: { name, price },
})

export const useItemActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators({ addNewItem }, dispatch)
}
