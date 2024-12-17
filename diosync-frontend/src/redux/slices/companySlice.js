import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  company: "",
}

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload
    },
  },
})

export const companySelector = (state) => state.company

const { actions, reducer } = companySlice

export const { setCompany } = actions

export default reducer
