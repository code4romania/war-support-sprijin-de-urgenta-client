import {useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<ThunkDispatch<any, any, any>>()
