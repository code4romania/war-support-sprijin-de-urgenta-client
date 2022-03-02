import {
  combineReducers,
  createStore,
  applyMiddleware,
  Middleware,
  PreloadedState,
  Store,
} from 'redux'
import { State } from './types/state.type'
import { createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import { auth } from './reducers/auth'
import { user } from './reducers/user'
import { locale } from './reducers/locale'
import { signup } from './reducers/signup'
import { steps, defaultStepsState } from './reducers/steps'
import {
  categories,
  initialState as defaultCategoriesState,
} from './reducers/categories'

const withMiddlewares = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const reducers = combineReducers({
  auth,
  locale,
  user,
  steps,
  categories,
  signup,
})

export const initStore = (initialState?: PreloadedState<State>) =>
  createStore(reducers, initialState, withMiddlewares([thunkMiddleware]))

const { withRedux: withStore } = createWrapper<Store<State>>(
  () =>
    initStore({
      defaultOffer: '',
      locale: 'ro',
      steps: defaultStepsState,
      categories: defaultCategoriesState,
      signup: null
    }),
  { debug: true }
)

export { withStore }
