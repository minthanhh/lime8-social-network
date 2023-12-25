import { createSlice } from '@reduxjs/toolkit'
// import { addExplore, getAllExploreThunk } from 'src/store/api/explores'

interface IAllExplores {
  explores: any[]
  isLoading: boolean
  addLoading: boolean
}
const initialState: IAllExplores = {
  explores: [],
  isLoading: false,
  addLoading: false
}

const AllExploreSlice = createSlice({
  initialState,
  name: 'allExplores',
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getAllExploreThunk.pending, (state) => {
  //       state.isLoading = true
  //     })
  //     .addCase(getAllExploreThunk.fulfilled, (state, action) => {
  //       state.isLoading = false
  //       state.explores = [...action.payload!]
  //     }),
  //     builder
  //       .addCase(addExplore.pending, (state) => {
  //         state.addLoading = true
  //       })
  //       .addCase(addExplore.fulfilled, (state, action) => {
  //         state.addLoading = false
  //         state.explores.unshift(action.payload)
  //       })
  // }
})

export default AllExploreSlice.reducer
