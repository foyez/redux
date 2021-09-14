import { nanoId } from '../../utils'
import { Actions } from './actions'

// initialState
const initialItems = [{ id: nanoId(), name: 'Fish', price: 400, quantity: 2 }]

export const itemsReducer = (state = initialItems, action) => {
  if (action.type === Actions.ITEM_ADDED) {
    const item = { id: nanoId(), quantity: 1, ...action.payload }
    return [...state, item]
  }

  return state
}
