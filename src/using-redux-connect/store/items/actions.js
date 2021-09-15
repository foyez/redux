export const Actions = {
  ITEM_ADDED: 'ITEM_ADDED',
}

export const addNewItem = (name, price) => ({
  type: Actions.ITEM_ADDED,
  payload: { name, price },
})
