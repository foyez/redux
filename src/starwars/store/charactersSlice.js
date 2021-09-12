import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const ENDPOINT = 'https://star-wars-characters.glitch.me/api/search/'
const initialState = {
  data: [],
  loading: false,
}

export const fetchCharacters = createAsyncThunk('characters/fetch', async (searchText) => {
  const data = await (await fetch(ENDPOINT + searchText)).json()
  return data.results
})

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    add: (state, action) => {
      state.characters = action.payload
    },
  },
  extraReducers: {
    [fetchCharacters.fulfilled]: (state, action) => {
      state.data = action.payload
      state.loading = false
    },
    [fetchCharacters.pending]: (state, action) => {
      state.loading = true
    },
  },
})
