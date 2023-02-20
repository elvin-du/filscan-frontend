import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'



// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   const response = await client.get('/fakeApi/posts')
//   return response.data
// })

// export const rankSlice = createSlice({
//   name: 'rank',
//   // `createSlice` 将从 `initialState` 参数推断 state 类型
//     initialState: {},
//     reducers: {
    
//     },
//     extraReducers(builder) {
//     builder
//       .addCase(fetchPosts.pending, (state, action) => {
//         state.status = 'loading'
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = 'succeeded'
//         // Add any fetched posts to the array
//         state.posts = state.posts.concat(action.payload)
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.error.message
//       })
//   }
// })
       

// export default rankSlice.reducer