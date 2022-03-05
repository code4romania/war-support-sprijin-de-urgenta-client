import {useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

// Use throughout the app instead of plain `useDispatch`
export const useAppDispatch = () => useDispatch<ThunkDispatch<any, any, any>>()
