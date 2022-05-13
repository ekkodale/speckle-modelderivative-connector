import { createStore } from 'redux'
import rootReducer from './RootReducer'

export const store = createStore(rootReducer)
