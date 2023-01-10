import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilscanState } from './hooks';


// 使用该类型定义初始 state
const initialState: FilscanState = {
    theme: 'light',
    lang:'zh-CN',
}
export const counterSlice = createSlice({
  name: 'Filscan',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
    reducers: {
        // 使用 PayloadAction 类型声明 `action.payload` 的内容
        changeState: (state: FilscanState, action: PayloadAction<FilscanState>) => { 
            const {payload } = action
            state.lang = payload.lang || state.lang;
            state.theme = payload.theme || state.theme;
        },
  }
})

export const { changeState } = counterSlice.actions

export default counterSlice.reducer