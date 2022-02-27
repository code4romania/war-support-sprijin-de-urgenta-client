import {
  combineReducers,
  createStore,
  applyMiddleware,
  Middleware,
  PreloadedState,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { user } from './reducers/user'

const withMiddlewares = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const reducers = combineReducers({
  user,
})

const initStore = (initialState?: PreloadedState<never>) =>
  createStore(reducers, initialState, withMiddlewares([thunkMiddleware]))

export { initStore }
